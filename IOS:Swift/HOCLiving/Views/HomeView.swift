import SwiftUI

struct HomeView: View {
    var onBrowse: (_ country: String, _ query: String) -> Void
    var onProperty: (Property) -> Void

    @State private var featured: [Property] = []
    @State private var loading = true
    @State private var query = ""
    @State private var suggestions: [SearchSuggestion] = []
    @State private var showSuggestions = false
    @State private var suggestTask: Task<Void, Never>?

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Homes across Europe")
                        .font(.title.bold())
                    Text("Search 300,000 live listings across 30 European countries")
                        .foregroundStyle(.secondary)

                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundStyle(.secondary)
                        TextField("Search city or country (e.g. Reykjavik)", text: $query)
                            .textInputAutocapitalization(.never)
                            .autocorrectionDisabled()
                            .onChange(of: query) { _, newValue in
                                scheduleSuggest(newValue)
                            }
                            .onSubmit { goSearch(nil) }
                    }
                    .padding(12)
                    .background(Color(.systemBackground))
                    .clipShape(RoundedRectangle(cornerRadius: 12))

                    if showSuggestions && !suggestions.isEmpty {
                        VStack(spacing: 0) {
                            ForEach(suggestions, id: \.self) { s in
                                Button {
                                    goSearch(s)
                                } label: {
                                    HStack {
                                        Text(s.label).fontWeight(.medium)
                                        Spacer()
                                        Text(s.kind)
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                    }
                                    .padding(.horizontal, 14)
                                    .padding(.vertical, 12)
                                }
                                .buttonStyle(.plain)
                                Divider()
                            }
                        }
                        .background(Color(.systemBackground))
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                        .shadow(radius: 2)
                    }

                    Button {
                        goSearch(nil)
                    } label: {
                        Text("Search")
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(AppTheme.primary)

                    Button("Browse all listings") {
                        onBrowse("Germany", "")
                    }
                    .frame(maxWidth: .infinity)
                }
                .padding()
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(AppTheme.primary.opacity(0.12))

                HStack(spacing: 12) {
                    StatBox(value: "300k", label: "Listings")
                    StatBox(value: "30", label: "Countries")
                    StatBox(value: "60k", label: "For rent")
                }
                .padding()

                HStack {
                    Text("Featured properties").font(.title3.bold())
                    Spacer()
                    Button("See all") { onBrowse("Germany", "") }
                }
                .padding(.horizontal)

                if loading {
                    ProgressView().frame(maxWidth: .infinity).padding()
                } else {
                    ForEach(featured) { p in
                        PropertyCardView(property: p)
                            .padding(.horizontal)
                            .padding(.vertical, 6)
                            .onTapGesture { onProperty(p) }
                    }
                }

                VStack(alignment: .leading, spacing: 12) {
                    Text("Why HOC Living?").font(.title3.bold())
                    Label("Europe-wide coverage — 30 countries", systemImage: "globe.europe.africa")
                    Label("Verified listings", systemImage: "checkmark.seal")
                    Label("End-to-end support", systemImage: "hand.thumbsup")
                }
                .padding()
            }
        }
        .navigationTitle("HOC Living")
        .task {
            loading = true
            defer { loading = false }
            do {
                let list = try await ListingsRepository.shared.loadCountry("Germany")
                featured = Array(list.prefix(6))
            } catch {
                featured = Array(SampleData.properties.prefix(6))
            }
        }
    }

    private func scheduleSuggest(_ text: String) {
        suggestTask?.cancel()
        guard !text.trimmingCharacters(in: .whitespaces).isEmpty else {
            suggestions = []
            showSuggestions = false
            return
        }
        suggestTask = Task {
            try? await Task.sleep(nanoseconds: 200_000_000)
            if Task.isCancelled { return }
            let hits = await ListingsRepository.shared.suggestions(query: text)
            await MainActor.run {
                suggestions = hits
                showSuggestions = !hits.isEmpty
            }
        }
    }

    private func goSearch(_ s: SearchSuggestion?) {
        showSuggestions = false
        if let s {
            switch s {
            case .country(let name):
                onBrowse(name, "")
            case .city(let city, let country):
                onBrowse(country, city)
            }
            return
        }
        let q = query.trimmingCharacters(in: .whitespacesAndNewlines)
        if q.isEmpty {
            onBrowse("Germany", "")
            return
        }
        Task {
            let hits = await ListingsRepository.shared.suggestions(query: q, limit: 1)
            await MainActor.run {
                if let h = hits.first {
                    goSearch(h)
                } else {
                    onBrowse("Germany", q)
                }
            }
        }
    }
}

private struct StatBox: View {
    let value: String
    let label: String
    var body: some View {
        VStack(spacing: 4) {
            Text(value).font(.headline.bold())
            Text(label).font(.caption).foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .shadow(color: .black.opacity(0.05), radius: 2, y: 1)
    }
}
