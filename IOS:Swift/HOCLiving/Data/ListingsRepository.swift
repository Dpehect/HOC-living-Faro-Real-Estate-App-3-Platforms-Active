import Foundation

/// Loads the same Europe catalog as the Web app from the Vercel static deployment.
@MainActor
final class ListingsRepository: ObservableObject {
    static let shared = ListingsRepository()
    static let baseURL = URL(string: "https://hoc-living-faro-real-estate-web-app.vercel.app")!

    @Published var countries: [String] = ["Germany"]
    private var manifest: Manifest?
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

    func loadCountry(_ country: String) async throws -> [Property] {
        let key = country.trimmingCharacters(in: .whitespaces)
        if let cached = cache[key] { return cached }
        if manifest == nil { await loadManifest() }
        guard let entry = manifest?.countries.first(where: { $0.country.caseInsensitiveCompare(key) == .orderedSame }) else {
            return SampleData.properties
        }
        let path = entry.file.hasPrefix("/") ? String(entry.file.dropFirst()) : entry.file
        let url = Self.baseURL.appendingPathComponent(path)
        let (data, _) = try await URLSession.shared.data(from: url)
        let list = try JSONDecoder().decode([Property].self, from: data)
        cache[key] = list
        return list
    }
}
