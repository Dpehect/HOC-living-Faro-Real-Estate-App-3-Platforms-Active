import Foundation

@MainActor
final class ListingsRepository: ObservableObject {
    static let shared = ListingsRepository()
    static let baseURL = URL(string: "https://hoc-living-faro-real-estate-web-app.vercel.app")!

    @Published var countries: [String] = ["Germany"]
    private var manifest: Manifest?
    private var cities: [CityRow] = []
    private var cache: [String: [Property]] = [:]

    func loadManifest() async {
        do {
            let url = Self.baseURL.appendingPathComponent("data/index.json")
            let (data, _) = try await URLSession.shared.data(from: url)
            let m = try JSONDecoder().decode(Manifest.self, from: data)
            manifest = m
            countries = m.countries.map(\.country)
        } catch {
            countries = ["Germany"]
        }
    }

    func loadCities() async -> [CityRow] {
        if !cities.isEmpty { return cities }
        do {
            let url = Self.baseURL.appendingPathComponent("data/cities.json")
            let (data, _) = try await URLSession.shared.data(from: url)
            cities = try JSONDecoder().decode([CityRow].self, from: data)
        } catch {
            cities = []
        }
        return cities
    }

    func loadCountry(_ country: String) async throws -> [Property] {
        let key = country.trimmingCharacters(in: .whitespaces)
        if let cached = cache[key] { return cached }
        if manifest == nil { await loadManifest() }
        guard let entry = manifest?.countries.first(where: {
            $0.country.caseInsensitiveCompare(key) == .orderedSame
        }) else {
            return SampleData.properties
        }
        let path = entry.file.hasPrefix("/") ? String(entry.file.dropFirst()) : entry.file
        let url = Self.baseURL.appendingPathComponent(path)
        let (data, _) = try await URLSession.shared.data(from: url)
        let list = try JSONDecoder().decode([Property].self, from: data)
        cache[key] = list
        return list
    }

    func suggestions(query: String, limit: Int = 12) async -> [SearchSuggestion] {
        let q = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard !q.isEmpty else { return [] }
        let cityRows = await loadCities()
        if countries.isEmpty || countries == ["Germany"] { await loadManifest() }
        var out: [SearchSuggestion] = []
        for c in countries where c.lowercased().contains(q) {
            out.append(.country(c))
        }
        for row in cityRows where row.city.lowercased().contains(q) || row.country.lowercased().contains(q) {
            out.append(.city(city: row.city, country: row.country))
        }
        out.sort { a, b in
            let al = a.label.lowercased(), bl = b.label.lowercased()
            let ap = al.hasPrefix(q) ? 0 : 1
            let bp = bl.hasPrefix(q) ? 0 : 1
            if ap != bp { return ap < bp }
            return al < bl
        }
        // unique
        var seen = Set<String>()
        return out.filter { s in
            let k = s.label
            if seen.contains(k) { return false }
            seen.insert(k)
            return true
        }.prefix(limit).map { $0 }
    }

    static func filter(
        posts: [Property],
        query: String = "",
        type: String = "all",
        property: String = "all",
        minBedrooms: Int = 0
    ) -> [Property] {
        let q = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        let exactCity: String? = {
            guard !q.isEmpty else { return nil }
            return posts.contains(where: { $0.city.lowercased() == q }) ? q : nil
        }()
        return posts.filter { p in
            let cityOk: Bool = {
                if let exact = exactCity { return p.city.lowercased() == exact }
                if q.isEmpty { return true }
                let s = "\(p.title) \(p.address) \(p.city) \(p.country)".lowercased()
                return s.contains(q)
            }()
            return cityOk
                && (type == "all" || p.type == type)
                && (property == "all" || p.property == property)
                && (minBedrooms == 0 || p.bedroom >= minBedrooms)
        }
    }
}
