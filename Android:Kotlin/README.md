# HOC Living — Android App (Kotlin + Jetpack Compose)

Android version of the [HOC Living Real Estate web app](https://github.com/Dpehect/HOC-living-München-Real-Estate-WEB-App).

## Screenshots

| Home | Listings | Detail |
|------|----------|--------|
| Hero, stats, featured properties | Filters (type / property / bedrooms) | Gallery, specs, description, CTA |

Place PNG screenshots in `screenshots/`:
- `home.png` — Home screen  
- `listings.png` — Listings + filters  
- `detail.png` — Property detail  

## Features

- **Home screen** — Hero section, stats (listings / cities / for rent), featured properties, why-us section  
- **Listings screen** — Filterable list (Buy/Rent, Apartment/House, min bedrooms)  
- **Property detail** — Image pager, price, specs, description, utilities / pet / income policies, “Request a tour” CTA  
- **Sample data** — 24 real properties from the original web app (München area)  
- **Modern UI** — Material 3, teal brand colors, Coil image loading  

## Tech stack

- Kotlin  
- Jetpack Compose + Material 3  
- Navigation Compose  
- Coil (images)  
- Min SDK 26 / Target SDK 34  

## How to open & run

1. Open **Android Studio** (Hedgehog or newer recommended).  
2. **File → Open** and select this project folder (`HOCLivingAndroid`).  
3. Wait for Gradle sync.  
4. Run on an emulator or physical device (API 26+).  

If Gradle wrapper binaries are missing, Android Studio will offer to create them automatically.

## Project structure

```
app/src/main/java/com/hocliving/muenchen/
├── MainActivity.kt
├── data/SampleData.kt
├── navigation/AppNavHost.kt
└── ui/
    ├── components/PropertyCard.kt
    ├── screens/
    │   ├── HomeScreen.kt
    │   ├── ListingsScreen.kt
    │   └── DetailScreen.kt
    └── theme/
```

## Notes

- Images load from the same remote URLs used by the web app.  
- “Request a tour” is a UI placeholder (no backend).  
- Map integration is not included in this version (can be added with Google Maps Compose later).  

Built as a faithful mobile companion to the original React + Vite real-estate site.
