import SwiftUI

struct DetailView: View {
    let property: Property
    @State private var currentPage = 0

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                // Image pager
                TabView(selection: $currentPage) {
                    ForEach(Array(property.images.enumerated()), id: \.offset) { index, url in
                        AsyncImage(url: URL(string: url)) { phase in
                            switch phase {
                            case .success(let image):
                                image.resizable().scaledToFill()
                            case .failure:
                                Color.gray.opacity(0.2)
                                    .overlay(Image(systemName: "photo").font(.largeTitle).foregroundStyle(.gray))
                            default:
                                Color.gray.opacity(0.15).overlay(ProgressView())
                            }
                        }
                        .tag(index)
                    }
                }
                .tabViewStyle(.page(indexDisplayMode: .automatic))
                .frame(height: 280)
                .clipped()

                VStack(alignment: .leading, spacing: 12) {
                    Text(property.isRent ? "FOR RENT" : "FOR SALE")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.white)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(property.isRent ? AppTheme.rentBlue : AppTheme.primary)
                        .clipShape(RoundedRectangle(cornerRadius: 6))

                    Text(property.title)
                        .font(.title2.bold())

                    Label("\(property.address), \(property.city)", systemImage: "mappin.and.ellipse")
                        .font(.subheadline)
                        .foregroundStyle(AppTheme.textSecondary)

                    // Specs
                    HStack {
                        SpecItem(icon: "bed.double", value: "\(property.bedroom)", label: "Beds")
                        SpecItem(icon: "bathtub", value: "\(property.bathroom)", label: "Baths")
                        SpecItem(icon: "square.dashed", value: "\(property.postDetail.size)", label: "Sqft")
                        SpecItem(icon: "house", value: property.property.capitalized, label: "Type")
                    }
                    .padding(.vertical, 8)

                    Divider()

                    Text("Description")
                        .font(.title3.bold())
                    Text(property.postDetail.desc)
                        .font(.body)
                        .foregroundStyle(AppTheme.textSecondary)

                    Text("Details")
                        .font(.title3.bold())
                        .padding(.top, 8)

                    DetailRow(label: "Utilities", value: property.postDetail.utilities)
                    DetailRow(label: "Pet policy", value: property.postDetail.pet)
                    DetailRow(label: "Income / financing", value: property.postDetail.income)
                }
                .padding(16)
            }
        }
        .background(AppTheme.background)
        .navigationBarTitleDisplayMode(.inline)
        .safeAreaInset(edge: .bottom) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(property.priceFormatted)
                        .font(.title3.bold())
                        .foregroundStyle(AppTheme.primary)
                    Text(property.isRent ? "Available for rent" : "Available for sale")
                        .font(.caption)
                        .foregroundStyle(AppTheme.textSecondary)
                }
                Spacer()
                Button("Request a tour") {}
                    .font(.headline)
                    .foregroundStyle(.white)
                    .padding(.horizontal, 18)
                    .padding(.vertical, 12)
                    .background(AppTheme.primary)
                    .clipShape(RoundedRectangle(cornerRadius: 12))
            }
            .padding(16)
            .background(.ultraThinMaterial)
        }
    }
}

private struct SpecItem: View {
    let icon: String
    let value: String
    let label: String

    var body: some View {
        VStack(spacing: 4) {
            Image(systemName: icon)
                .foregroundStyle(AppTheme.primary)
            Text(value)
                .font(.headline)
            Text(label)
                .font(.caption2)
                .foregroundStyle(AppTheme.textSecondary)
        }
        .frame(maxWidth: .infinity)
    }
}

private struct DetailRow: View {
    let label: String
    let value: String

    var body: some View {
        HStack(alignment: .top) {
            Text(label)
                .font(.subheadline)
                .foregroundStyle(AppTheme.textSecondary)
            Spacer()
            Text(value)
                .font(.subheadline.weight(.medium))
                .multilineTextAlignment(.trailing)
                .frame(maxWidth: 220, alignment: .trailing)
        }
        .padding(.vertical, 4)
    }
}
