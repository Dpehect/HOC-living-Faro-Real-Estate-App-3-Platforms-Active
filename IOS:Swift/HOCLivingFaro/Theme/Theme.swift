import SwiftUI

enum AppTheme {
    static let primary = Color(red: 0.06, green: 0.46, blue: 0.43)      // #0F766E
    static let primaryDark = Color(red: 0.05, green: 0.36, blue: 0.34)
    static let tealLight = Color(red: 0.08, green: 0.72, blue: 0.65)
    static let tealContainer = Color(red: 0.80, green: 0.98, blue: 0.95)
    static let background = Color(red: 0.97, green: 0.98, blue: 0.99)
    static let textPrimary = Color(red: 0.12, green: 0.16, blue: 0.23)
    static let textSecondary = Color(red: 0.39, green: 0.45, blue: 0.55)
    static let rentBlue = Color(red: 0.01, green: 0.41, blue: 0.63)
}

struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundStyle(.white)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 14)
            .background(AppTheme.primary)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .opacity(configuration.isPressed ? 0.85 : 1)
    }
}
