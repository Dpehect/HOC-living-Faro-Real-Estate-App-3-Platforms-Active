import SwiftUI

enum AppRoute: Hashable {
    case listings(country: String, query: String)
    case detail(Property)
}

struct ContentView: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            HomeView(
                onBrowse: { country, q in
                    path.append(AppRoute.listings(country: country, query: q))
                },
                onProperty: { property in
                    path.append(AppRoute.detail(property))
                }
            )
            .navigationDestination(for: AppRoute.self) { route in
                switch route {
                case .listings(let country, let query):
                    ListingsView(initialCountry: country, initialQuery: query) { property in
                        path.append(AppRoute.detail(property))
                    }
                case .detail(let property):
                    DetailView(property: property)
                }
            }
        }
        .tint(AppTheme.primary)
    }
}

#Preview {
    ContentView()
}
