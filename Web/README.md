# HOC Living — Web

React + Vite real estate web app covering **Europe**.

**Brand:** HOC Living  
**Market:** Europe — **30 countries × 10,000 listings = 300,000** properties

## Data layout (GitHub-friendly)

Large catalog is **split by country** (each file ~5 MB, under GitHub’s 100 MB limit):

```
public/data/
  index.json                 # manifest
  countries/
    Germany.json             # 10,000 listings
    France.json
    ...
src/pages/postsData.json     # small sample (~300) only
```

Listings load on demand via `src/lib/listings.ts` when a country is selected on `/listings`.

## Coverage

Germany, France, Finland, Sweden, Norway, Denmark, Netherlands, Belgium, Austria, Switzerland, Italy, Spain, Portugal, Poland, Czech Republic, Ireland, United Kingdom, Greece, Hungary, Romania, Croatia, Slovakia, Slovenia, Estonia, Latvia, Lithuania, Luxembourg, Iceland, Bulgaria, Serbia.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Deploy

Vercel (`vercel.json`). Country JSON files are served as static assets from `public/`.
