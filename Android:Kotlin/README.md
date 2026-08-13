# HOC Living — Android (Kotlin + Jetpack Compose)

Native Android companion to the **HOC Living** Web app (Europe-wide real estate).

## Same as Web
- Brand: **HOC Living** — Homes across Europe
- Stats: 300,000 listings · 30 countries · 60k for rent
- Country selector loads the **same** country JSON files as the Web deployment
- Filters: Buy/Rent, Apartment/House, min bedrooms
- Data source: `https://hoc-living-faro-real-estate-web-app.vercel.app/data/`

## Requirements
- Android Studio Hedgehog+
- Min SDK 26 / Target 34
- Internet permission (for live catalog)

## Run
1. Open the `Android/` folder in Android Studio
2. Sync Gradle → Run on emulator or device

## Notes
- Listings are fetched per country on demand (same as Web)
- Offline fallback sample (Germany cities) if network fails
- No Faro branding remaining
