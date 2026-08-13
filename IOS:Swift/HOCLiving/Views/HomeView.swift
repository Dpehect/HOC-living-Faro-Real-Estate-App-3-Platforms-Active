import SwiftUI

struct HomeView: View {
    var onBrowse: () -> Void
    var onProperty: (Property) -> Void

    @State private var featured: [Property] = []
    @State private var loading = true

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Homes across Europe")
                        .font(.title.bold())
                    Text("Search 300,000 live listings across 30 European countries")
                        .foregroundStyle(.secondary)
                    Button(action: onBrowse) {
                        Text("Browse all listings")
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(AppTheme.primary)
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
                    Button("See all", action: onBrowse)
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
