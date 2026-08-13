import SwiftUI

enum AppRoute: Hashable {
    case listings
    case detail(Property)
}

struct ContentView: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            HomeView(
                onBrowse: { path.append(AppRoute.listings) },
                onProperty: { property in path.append(AppRoute.detail(property)) }
            )
            .navigationDestination(for: AppRoute.self) { route in
                switch route {
                case .listings:
                    ListingsView { property in
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
