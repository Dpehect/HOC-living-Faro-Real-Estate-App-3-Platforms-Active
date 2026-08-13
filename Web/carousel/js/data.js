// Card data — derived from the captured carousel markup.
// `img` URLs are the original artwork sources; if they fail to load
// (e.g. offline), the card falls back to its solid `bg` color.
const CARD_DATA = [
  {
    id: "new-releases",
    type: "card",
    category: "New and Rising",
    subtitle: "Fresh music, growing fast",
    bg: "rgb(167, 105, 0)",
    title: "Dont Come Too Close II",
    artist: "Okese1, DarkoVibes, Sista Afia & Joey B",
    count: "80,495",
    img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d1/35/7a/d1357a14-bb27-53db-3e2c-9269b0648265/859742197307_cover.jpg/600x600bb.webp"
  },
  {
    id: "catalogue-movement",
    type: "card",
    category: "Rediscovered",
    subtitle: "Older songs reaching new fans",
    bg: "rgb(12, 15, 15)",
    title: "Close To Me",
    artist: "The Cure",
    date: "August 1985",
    count: "3,312,718",
    img: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/7f/b1/9c/7fb19cf8-ea2a-75c8-59a9-72a4a06f5d72/00602498400173.rgb.jpg/600x600bb.webp"
  },
  {
    id: "artist-movement",
    type: "card",
    category: "Artist on the Move",
    subtitle: "Rising Fast on Shazam",
    bg: "rgb(102, 121, 131)",
    title: "KAROL G",
    artist: "Latin Urban",
    meta: "Colombia",
    img: "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages221/v4/84/8a/4e/848a4e8b-48c7-e3fa-ae20-a42cd4b469a8/ami-identity-d59cbd95617167e768f2dbfe6377cf2e-2026-08-09T23-03-10.005Z_cropped.png/600x600bb.webp"
  },
  {
    id: "viral-tv",
    type: "card",
    category: "As Heard on Screen",
    subtitle: "TV, Film, and Cultural Moments",
    bg: "rgb(38, 37, 32)",
    title: "Kansas City",
    artist: "The New Basement Tapes",
    count: "591,135",
    img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/21/45/f5/2145f527-b8c5-94c3-b9b7-eefe308a1c56/00602537950133.rgb.jpg/600x600bb.webp"
  },
  {
    id: "spin-index",
    type: "card",
    category: "Radio Reaction",
    subtitle: "Shazam discovery, driven by radio",
    bg: "rgb(118, 118, 118)",
    title: "MORNING DEW (DONK)",
    artist: "Beyoncé",
    count: "1,646,034",
    img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3f/65/3d/3f653d87-197c-084c-dca2-0c6e0ca742c9/196874580721.jpg/600x600bb.webp"
  },
  {
    id: "viral-socials",
    type: "card",
    category: "Going Viral",
    subtitle: "The songs taking over your feed",
    bg: "rgb(4, 25, 36)",
    title: "Te Estoy Correteando",
    artist: "LATIN MAFIA & Fred again..",
    count: "91,830",
    img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/90/52/6e/90526e94-89c7-8387-458f-1972f7995d48/1200214495824.jpg/600x600bb.webp"
  },
  {
    id: "discover",
    type: "mosaic",
    category: "Discover More",
    subtitle: "See the songs and artists trending this week, all around the world",
    bg: "rgb(73, 80, 79)",
    title: "Discover More",
    href: "#",
    mosaic: [
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ff/5b/2f/ff5b2f6d-8088-74b4-21b5-41f7b6b7a31a/cover.jpg/300x300bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c8/de/49/c8de4918-dff7-32e4-0e68-c139d66d7c9c/cover.jpg/300x300bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/61/0e/62/610e62bb-3027-b3d8-a8b3-18c6ed2c5e23/193483457925.jpg/300x300bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/Music111/v4/77/74/5f/77745f1e-8259-92b4-b5ff-65af204d0262/191018653927.jpg/300x300bb.jpg"
    ]
  }
];
