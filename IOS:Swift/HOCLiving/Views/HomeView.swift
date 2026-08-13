import SwiftUI

struct HomeView: View {
    let onBrowse: () -> Void
    let onProperty: (Property) -> Void

    private let featured = Array(SampleData.properties.prefix(6))

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 0) {
                    // Hero
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Homes across München & Bayern, centered in München")
                            .font(.title2.bold())
                            .foregroundStyle(AppTheme.textPrimary)

                        Text("Search live listings — from Bayern apartments to homes in Schwabing, Maxvorstadt and beyond.")
                            .font(.body)
                            .foregroundStyle(AppTheme.textSecondary)

                        HStack {
                            Image(systemName: "magnifyingglass")
                                .foregroundStyle(AppTheme.textSecondary)
                            Text("Search properties in your city")
                                .foregroundStyle(AppTheme.textSecondary)
                            Spacer()
                        }
                        .padding(12)
                        .background(Color(.systemBackground))
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.gray.opacity(0.25), lineWidth: 1)
                        )

                        Button("Browse all listings", action: onBrowse)
                            .buttonStyle(PrimaryButtonStyle())
                    }
                    .padding(20)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(AppTheme.tealContainer.opacity(0.45))

                    // Stats
                    HStack(spacing: 12) {
                        StatCard(icon: "house.fill", value: "1,098", label: "Listings")
                        StatCard(icon: "building.2.fill", value: "539", label: "Cities")
                        StatCard(icon: "hand.thumbsup.fill", value: "482", label: "For rent")
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 20)

                    // Featured header
                    HStack {
                        Text("Featured properties")
                            .font(.title3.bold())
                        Spacer()
                        Button("See all", action: onBrowse)
                            .font(.subheadline.weight(.medium))
                            .foregroundStyle(AppTheme.primary)
                    }
                    .padding(.horizontal, 16)

                    LazyVStack(spacing: 14) {
                        ForEach(featured) { property in
                            Button {
                                onProperty(property)
                            } label: {
                                PropertyCardView(property: property)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.top, 8)

                    // Why us
                    VStack(alignment: .leading, spacing: 16) {
                        Text("Why HOC Living?")
                            .font(.title3.bold())

                        FeatureRow(icon: "building.2", title: "Local expertise", subtitle: "Deep knowledge of München and surroundings market.")
                        FeatureRow(icon: "checkmark.seal", title: "Verified listings", subtitle: "Every property is carefully reviewed.")
                        FeatureRow(icon: "person.2", title: "End-to-end support", subtitle: "From search to keys in hand.")
                    }
                    .padding(16)
                    .padding(.bottom, 24)
                }
            }
            .background(AppTheme.background)
            .navigationTitle("HOC Living")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text("HOC Living")
                        .font(.headline.bold())
                        .foregroundStyle(AppTheme.primary)
                }
            }
        }
    }
}

private struct StatCard: View {
    let icon: String
    let value: String
    let label: String

    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .foregroundStyle(AppTheme.primary)
            Text(value)
                .font(.headline.bold())
            Text(label)
                .font(.caption)
                .foregroundStyle(AppTheme.textSecondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .shadow(color: .black.opacity(0.04), radius: 4, y: 1)
    }
}

private struct FeatureRow: View {
    let icon: String
    let title: String
    let subtitle: String

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundStyle(AppTheme.primary)
                .frame(width: 44, height: 44)
                .background(AppTheme.tealContainer)
                .clipShape(RoundedRectangle(cornerRadius: 10))

            VStack(alignment: .leading, spacing: 2) {
                Text(title).font(.headline)
                Text(subtitle)
                    .font(.subheadline)
                    .foregroundStyle(AppTheme.textSecondary)
            }
        }
    }
}
