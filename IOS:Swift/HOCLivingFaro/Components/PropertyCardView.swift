import SwiftUI

struct PropertyCardView: View {
    let property: Property

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            ZStack(alignment: .topLeading) {
                AsyncImage(url: URL(string: property.images.first ?? "")) { phase in
                    switch phase {
                    case .success(let image):
                        image
                            .resizable()
                            .scaledToFill()
                    case .failure:
                        Rectangle().fill(Color.gray.opacity(0.2))
                            .overlay(Image(systemName: "house").font(.largeTitle).foregroundStyle(.gray))
                    default:
                        Rectangle().fill(Color.gray.opacity(0.15))
                            .overlay(ProgressView())
                    }
                }
                .frame(height: 180)
                .clipped()

                Text(property.isRent ? "FOR RENT" : "FOR SALE")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.white)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 6)
                    .background(property.isRent ? AppTheme.rentBlue : AppTheme.primary)
                    .clipShape(RoundedRectangle(cornerRadius: 0, style: .continuous))
                    .clipShape(
                        .rect(topLeadingRadius: 0, bottomLeadingRadius: 0, bottomTrailingRadius: 10, topTrailingRadius: 0)
                    )
            }

            VStack(alignment: .leading, spacing: 6) {
                Text(property.priceFormatted)
                    .font(.title3.bold())
                    .foregroundStyle(AppTheme.primary)

                Text(property.title)
                    .font(.headline)
                    .lineLimit(1)

                Text("\(property.address), \(property.city)")
                    .font(.subheadline)
                    .foregroundStyle(AppTheme.textSecondary)
                    .lineLimit(1)

                HStack(spacing: 16) {
                    Label("\(property.bedroom)", systemImage: "bed.double")
                    Label("\(property.bathroom)", systemImage: "bathtub")
                    Label("\(property.postDetail.size) sqft", systemImage: "square.dashed")
                }
                .font(.caption)
                .foregroundStyle(AppTheme.textSecondary)
                .padding(.top, 4)
            }
            .padding(14)
        }
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.06), radius: 8, y: 2)
    }
}
