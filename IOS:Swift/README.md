# HOC Living — iOS (SwiftUI)

Native iOS companion to the **HOC Living** Web app (Europe-wide real estate).

## Same as Web
- Brand: **HOC Living** — Homes across Europe
- Stats: 300,000 listings · 30 countries · 60k for rent
- Country selector loads the **same** country JSON files as the Web deployment
- Filters: Buy/Rent, Apartment/House, min bedrooms
- Data source: `https://hoc-living-faro-real-estate-web-app.vercel.app/data/`

## Requirements
- Xcode 15+
- iOS 16+

## Run
1. Open `HOCLiving.xcodeproj` in Xcode (create a new App project and replace sources if project file is missing)
2. Add all files under `HOCLiving/` to the target
3. Enable outbound network (App Transport Security allows HTTPS by default)
4. Run on simulator or device

## Project structure
```
HOCLiving/
├── HOCLivingApp.swift
├── ContentView.swift
├── Data/
│   ├── Models.swift
│   ├── ListingsRepository.swift
│   └── SampleData.swift
├── Theme/Theme.swift
├── Components/PropertyCardView.swift
└── Views/
    ├── HomeView.swift
    ├── ListingsView.swift
    └── DetailView.swift
```

## Notes
- Listings are fetched per country on demand (same as Web)
- Offline fallback sample (Germany cities) if network fails
- Old Faro project removed — only HOCLiving remains
