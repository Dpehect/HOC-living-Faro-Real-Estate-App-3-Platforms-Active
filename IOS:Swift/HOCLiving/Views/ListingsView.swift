import SwiftUI

struct ListingsView: View {
    var initialCountry: String = "Germany"
    var initialQuery: String = ""
    var onProperty: (Property) -> Void

    @State private var countries: [String] = ["Germany"]
    @State private var activeCountry: String
    @State private var query: String
    @State private var posts: [Property] = []
    @State private var loading = true
    @State private var error: String?
    @State private var typeFilter = "all"
    @State private var propertyFilter = "all"
    @State private var bedroomsFilter = 0
    @State private var showFilters = false

    init(initialCountry: String = "Germany", initialQuery: String = "", onProperty: @escaping (Property) -> Void) {
        self.initialCountry = initialCountry
        self.initialQuery = initialQuery
        self.onProperty = onProperty
        _activeCountry = State(initialValue: initialCountry)
        _query = State(initialValue: initialQuery)
    }

    private var filtered: [Property] {
        // Recomputed when posts updates — same fix as Web postsData dependency
        ListingsRepository.filter(
            posts: posts,
            query: query,
            type: typeFilter,
            property: propertyFilter,
            minBedrooms: bedroomsFilter
        )
    }

    var body: some View {
        VStack(spacing: 0) {
            VStack(alignment: .leading, spacing: 8) {
                Text("Country").font(.subheadline.bold())
                Picker("Country", selection: $activeCountry) {
                    ForEach(countries, id: \.self) { Text($0).tag($0) }
                }
                .pickerStyle(.menu)

                TextField("Filter by city (e.g. Reykjavik)", text: $query)
                    .textFieldStyle(.roundedBorder)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()

                Text("Same catalog as Web · Europe-wide")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .padding()
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color(.secondarySystemBackground))

            if showFilters {
                VStack(alignment: .leading, spacing: 10) {
                    Text("Type").font(.caption.bold())
                    Picker("Type", selection: $typeFilter) {
                        Text("All").tag("all")
                        Text("Buy").tag("buy")
                        Text("Rent").tag("rent")
                    }
                    .pickerStyle(.segmented)
                    Text("Property").font(.caption.bold())
                    Picker("Property", selection: $propertyFilter) {
                        Text("All").tag("all")
                        Text("Apartment").tag("apartment")
                        Text("House").tag("house")
                    }
                    .pickerStyle(.segmented)
                    Text("Min bedrooms").font(.caption.bold())
                    Picker("Beds", selection: $bedroomsFilter) {
                        Text("Any").tag(0)
                        Text("1+").tag(1)
                        Text("2+").tag(2)
                        Text("3+").tag(3)
                        Text("4+").tag(4)
                    }
                    .pickerStyle(.segmented)
                }
                .padding()
            }

            if loading {
                Spacer()
                ProgressView("Loading \(activeCountry) listings…")
                Spacer()
            } else {
                if let error {
                    Text(error).font(.caption).foregroundStyle(.red).padding(.horizontal)
                }
                Text("\(filtered.count) properties found · \(activeCountry)" + (query.isEmpty ? "" : " · \"\(query)\""))
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                    .padding(.top, 8)

                List(filtered) { p in
                    PropertyCardView(property: p)
                        .listRowInsets(EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16))
                        .listRowSeparator(.hidden)
                        .onTapGesture { onProperty(p) }
                }
                .listStyle(.plain)
            }
        }
        .navigationTitle("Listings")
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button { showFilters.toggle() } label: {
                    Image(systemName: "line.3.horizontal.decrease.circle")
                }
            }
        }
        .task { await loadCountries() }
        .task(id: activeCountry) { await loadListings() }
    }

    private func loadCountries() async {
        await ListingsRepository.shared.loadManifest()
        countries = ListingsRepository.shared.countries
        if !countries.contains(activeCountry), let first = countries.first {
            activeCountry = first
        }
    }

    private func loadListings() async {
        loading = true
        error = nil
        defer { loading = false }
        do {
            posts = try await ListingsRepository.shared.loadCountry(activeCountry)
        } catch {
            self.error = "Could not load \(activeCountry) — offline sample"
            posts = SampleData.properties
        }
    }
}
