# HOC Living Faro — iOS App (SwiftUI)

iOS version of the [HOC Living Faro Real Estate web app](https://github.com/Dpehect/HOC-living-Faro-Real-Estate-WEB-App).

## Features

- **Home** — Hero, stats, featured properties, “Why us”
- **Listings** — Filters: Buy/Rent, Apartment/House, min bedrooms
- **Detail** — Image pager, price, specs, description, policies, “Request a tour”
- **Sample data** — 24 properties from the original web app (Faro)

## Requirements

- Xcode 15+
- iOS 16.0+
- Swift 5.9+

## How to run

1. Unzip the archive.
2. Open `HOCLivingFaro.xcodeproj` in Xcode.
3. Select an iPhone simulator (or device).
4. Press **Run** (⌘R).

If signing is required for a physical device, set your **Team** under Signing & Capabilities.

## Project structure

```
HOCLivingFaro/
├── HOCLivingFaroApp.swift      # @main entry
├── ContentView.swift           # Navigation root
├── Data/SampleData.swift       # Models + sample listings
├── Theme/Theme.swift
├── Components/PropertyCardView.swift
└── Views/
    ├── HomeView.swift
    ├── ListingsView.swift
    └── DetailView.swift
```

## Notes

- Images load from remote URLs used by the web app (network required).
- “Request a tour” is a UI placeholder.
- MapKit can be added later for map search.

Built as a native SwiftUI companion to the original React site.
