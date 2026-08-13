import SwiftUI

struct ListingsView: View {
    let onProperty: (Property) -> Void
    @Environment(\.dismiss) private var dismiss

    @State private var typeFilter = "all"      // all | buy | rent
    @State private var propertyFilter = "all"  // all | apartment | house
    @State private var bedroomsFilter = 0
    @State private var showFilters = false

    private var filtered: [Property] {
        SampleData.properties.filter { p in
            (typeFilter == "all" || p.type == typeFilter) &&
            (propertyFilter == "all" || p.property == propertyFilter) &&
            (bedroomsFilter == 0 || p.bedroom >= bedroomsFilter)
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            if showFilters {
                filterPanel
                    .padding(.horizontal, 16)
                    .padding(.vertical, 8)
            }

            Text("\(filtered.count) properties found")
                .font(.subheadline)
                .foregroundStyle(AppTheme.textSecondary)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, 16)
                .padding(.vertical, 8)

            ScrollView {
                LazyVStack(spacing: 14) {
                    ForEach(filtered) { property in
                        Button {
                            onProperty(property)
                        } label: {
                            PropertyCardView(property: property)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 24)
            }
        }
        .background(AppTheme.background)
        .navigationTitle("Listings")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    withAnimation { showFilters.toggle() }
                } label: {
                    Image(systemName: "line.3.horizontal.decrease.circle")
                        .foregroundStyle(AppTheme.primary)
                }
            }
        }
    }

    private var filterPanel: some View {
        VStack(alignment: .leading, spacing: 12) {
            filterGroup(title: "Type", options: [("all", "All"), ("buy", "Buy"), ("rent", "Rent")], selection: $typeFilter)
            filterGroup(title: "Property", options: [("all", "All"), ("apartment", "Apartment"), ("house", "House")], selection: $propertyFilter)

            Text("Min bedrooms")
                .font(.caption.weight(.semibold))
            HStack(spacing: 8) {
                ForEach([0, 1, 2, 3, 4], id: \.self) { n in
                    let label = n == 0 ? "Any" : "\(n)+"
                    Chip(label: label, selected: bedroomsFilter == n) {
                        bedroomsFilter = n
                    }
                }
            }
        }
        .padding(12)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }

    private func filterGroup(title: String, options: [(String, String)], selection: Binding<String>) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title).font(.caption.weight(.semibold))
            HStack(spacing: 8) {
                ForEach(options, id: \.0) { value, label in
                    Chip(label: label, selected: selection.wrappedValue == value) {
                        selection.wrappedValue = value
                    }
                }
            }
        }
    }
}

private struct Chip: View {
    let label: String
    let selected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(label)
                .font(.subheadline.weight(.medium))
                .padding(.horizontal, 12)
                .padding(.vertical, 7)
                .background(selected ? AppTheme.primary : Color(.systemBackground))
                .foregroundStyle(selected ? .white : AppTheme.textPrimary)
                .clipShape(Capsule())
                .overlay(
                    Capsule().stroke(selected ? Color.clear : Color.gray.opacity(0.3), lineWidth: 1)
                )
        }
        .buttonStyle(.plain)
    }
}
