import Foundation

struct PostDetail: Identifiable, Codable, Hashable {
    var id: String { desc.prefix(20) + String(size) }
    let desc: String
    let utilities: String
    let pet: String
    let income: String
    let size: Int
}

struct Property: Identifiable, Codable, Hashable {
    let id: Int
    let title: String
    let price: Int
    let images: [String]
    let address: String
    let city: String
    let bedroom: Int
    let bathroom: Int
    let latitude: Double
    let longitude: Double
    let type: String // buy | rent
    let property: String // apartment | house
    let postDetail: PostDetail

    var isRent: Bool { type == "rent" }
    var priceFormatted: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencyCode = "EUR"
        formatter.maximumFractionDigits = 0
        let base = formatter.string(from: NSNumber(value: price)) ?? "€\(price)"
        return isRent ? "\(base)/mo" : base
    }
}

enum SampleData {
    static let properties: [Property] = [
        Property(
            id: 1,
            title: "Apartment in Faro for sale",
            price: 348000,
            images: ["https://framerusercontent.com/images/TxUBsMONXRW8Zmgf29XgOwyAFBE.webp", "https://framerusercontent.com/images/bMg91HJevCOwyP5XL8IWnGvE.webp"],
            address: "Street 2",
            city: "Faro",
            bedroom: 2,
            bathroom: 1,
            latitude: 37.02166,
            longitude: -7.9672,
            type: "buy",
            property: "apartment",
            postDetail: PostDetail(
                desc: "In one of Faro's established neighbourhoods, this 2-bedroom apartment provides a solid base for modern living. Spanning roughly 1400 sqft, the property gives flexibility for work-from-home setups or guest accommodation. You will find 2 bedroom(s) alongside 1 bathroom(s), a practical combination for couples. Neutral tones and simple detailing make the interiors easy to personalise to your own style...",
                utilities: "Utilities not included; average monthly estimate available on request",
                pet: "Small pets only (under 10 kg), deposit required",
                income: "Cash or bank-financed purchases both accepted",
                size: 1400
            )
        ),
        Property(
            id: 7,
            title: "Apartment in Loulé for sale",
            price: 237600,
            images: ["https://framerusercontent.com/images/bMg91HJevCOwyP5XL8IWnGvE.webp", "https://framerusercontent.com/images/M9TEzS8kEaXgoKgQ3VFPk3ipo.webp"],
            address: "Street 8",
            city: "Loulé",
            bedroom: 1,
            bathroom: 1,
            latitude: 37.15569,
            longitude: -8.02159,
            type: "buy",
            property: "apartment",
            postDetail: PostDetail(
                desc: "This inviting 1-bedroom apartment in Loulé combines thoughtful design with a warm residential atmosphere. With around 700 sqft of usable space, the interior feels open while remaining easy to furnish and maintain. The sleeping wing includes 1 bedroom(s), complemented by 1 bathroom(s) for comfortable daily use. Neutral tones and simple detailing make the interiors easy to personalise to your own st...",
                utilities: "Utilities not included; average monthly estimate available on request",
                pet: "No pets permitted under building rules",
                income: "N/A — standard freehold / title purchase",
                size: 700
            )
        ),
        Property(
            id: 9,
            title: "Apartment in Quarteira for sale",
            price: 930000,
            images: ["https://framerusercontent.com/images/nVpXLvCjUikE6dq1mgsikOWnRtQ.webp?scale-down-to=512", "https://framerusercontent.com/images/ogbmw8amuGTcXhUz7EMeguTj1M.webp?scale-down-to=512"],
            address: "Street 10",
            city: "Quarteira",
            bedroom: 3,
            bathroom: 2,
            latitude: 37.05203,
            longitude: -8.14014,
            type: "buy",
            property: "apartment",
            postDetail: PostDetail(
                desc: "This inviting 3-bedroom apartment in Quarteira combines thoughtful design with a warm residential atmosphere. Spanning roughly 700 sqft, the property gives flexibility for work-from-home setups or guest accommodation. You will find 3 bedroom(s) alongside 2 bathroom(s), a practical combination for families. Windows bring daylight into the principal rooms, creating a bright backdrop for furniture an...",
                utilities: "Utilities not included; average monthly estimate available on request",
                pet: "Cats allowed; dogs considered case by case",
                income: "Financing subject to bank appraisal of the property",
                size: 700
            )
        ),
        Property(
            id: 11,
            title: "Apartment in Almancil for sale",
            price: 930000,
            images: ["https://framerusercontent.com/images/TxUBsMONXRW8Zmgf29XgOwyAFBE.webp", "https://framerusercontent.com/images/bMg91HJevCOwyP5XL8IWnGvE.webp"],
            address: "Street 12",
            city: "Almancil",
            bedroom: 3,
            bathroom: 2,
            latitude: 37.08949,
            longitude: -8.02951,
            type: "buy",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Discover a carefully presented 3-bedroom apartment in Almancil, ideal for those who value quality and location. The layout spreads across approximately 1800 sqft, with clearly defined living, sleeping and service areas. There are 3 bedroom(s) and 2 bathroom(s), arranged to support both privacy and shared family time. The overall condition suggests regular care, so new owners or tenants can focus o...",
                utilities: "Condo fees cover water and waste; power is metered separately",
                pet: "Pets not allowed except assistance animals",
                income: "Cash or bank-financed purchases both accepted",
                size: 1800
            )
        ),
        Property(
            id: 19,
            title: "Apartment in Armação de Pêra for sale",
            price: 290400,
            images: ["https://framerusercontent.com/images/nVpXLvCjUikE6dq1mgsikOWnRtQ.webp?scale-down-to=512", "https://framerusercontent.com/images/ogbmw8amuGTcXhUz7EMeguTj1M.webp?scale-down-to=512"],
            address: "Street 20",
            city: "Armação de Pêra",
            bedroom: 4,
            bathroom: 4,
            latitude: 37.10888,
            longitude: -8.39244,
            type: "buy",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Welcome to a well-maintained 4-bedroom apartment in Armação de Pêra, ready to suit both residents and investors. Spanning roughly 700 sqft, the property gives flexibility for work-from-home setups or guest accommodation. You will find 4 bedroom(s) alongside 4 bathroom(s), a practical combination for families. Neutral tones and simple detailing make the interiors easy to personalise to your own sty...",
                utilities: "Partially included — water in condo fee; electricity separate",
                pet: "Pets welcome — reasonable pet deposit applies",
                income: "Mortgage pre-approval recommended before formal offer",
                size: 700
            )
        ),
        Property(
            id: 30,
            title: "Apartment in Ferragudo for sale",
            price: 372000,
            images: ["https://framerusercontent.com/images/ogbmw8amuGTcXhUz7EMeguTj1M.webp?scale-down-to=512", "https://framerusercontent.com/images/TxUBsMONXRW8Zmgf29XgOwyAFBE.webp"],
            address: "Street 31",
            city: "Ferragudo",
            bedroom: 3,
            bathroom: 2,
            latitude: 37.10648,
            longitude: -8.48615,
            type: "buy",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Nestled in the heart of Ferragudo, this 3-bedroom apartment offers a refined and practical living experience. With around 700 sqft of usable space, the interior feels open while remaining easy to furnish and maintain. With 3 bedroom(s) and 2 bathroom(s), the property adapts well to changing household needs. Natural light reaches the main living spaces, and the finishes are consistent with a proper...",
                utilities: "Utilities not included; average monthly estimate available on request",
                pet: "Small pets only (under 10 kg), deposit required",
                income: "Financing subject to bank appraisal of the property",
                size: 700
            )
        ),
        Property(
            id: 2,
            title: "House in Faro for sale",
            price: 700000,
            images: ["https://framerusercontent.com/images/bMg91HJevCOwyP5XL8IWnGvE.webp", "https://framerusercontent.com/images/M9TEzS8kEaXgoKgQ3VFPk3ipo.webp"],
            address: "Street 3",
            city: "Faro",
            bedroom: 3,
            bathroom: 3,
            latitude: 37.02549,
            longitude: -7.90026,
            type: "buy",
            property: "house",
            postDetail: PostDetail(
                desc: "Set in Faro, this 3-bedroom house stands out for its balance of space, light and convenience. With around 1800 sqft of usable space, the interior feels open while remaining easy to furnish and maintain. There are 3 bedroom(s) and 3 bathroom(s), arranged to support both privacy and shared family time. Windows bring daylight into the principal rooms, creating a bright backdrop for furniture and déco...",
                utilities: "Not included — tenant pays electricity, water and internet",
                pet: "Cats allowed; dogs considered case by case",
                income: "N/A — standard freehold / title purchase",
                size: 1800
            )
        ),
        Property(
            id: 5,
            title: "House in Olhão for sale",
            price: 372000,
            images: ["https://framerusercontent.com/images/ogbmw8amuGTcXhUz7EMeguTj1M.webp?scale-down-to=512", "https://framerusercontent.com/images/TxUBsMONXRW8Zmgf29XgOwyAFBE.webp"],
            address: "Street 6",
            city: "Olhão",
            bedroom: 3,
            bathroom: 3,
            latitude: 37.03258,
            longitude: -7.83487,
            type: "buy",
            property: "house",
            postDetail: PostDetail(
                desc: "This attractive 3-bedroom house in Olhão is positioned to enjoy the best of local life and amenities. The 700 sqft floor plan makes efficient use of every square metre, from the entrance to the private rooms. You will find 3 bedroom(s) alongside 3 bathroom(s), a practical combination for families. Neutral tones and simple detailing make the interiors easy to personalise to your own style. Whether ...",
                utilities: "Condo fees cover water and waste; power is metered separately",
                pet: "Pets allowed with prior written approval",
                income: "Cash or bank-financed purchases both accepted",
                size: 700
            )
        ),
        Property(
            id: 6,
            title: "House in Olhão for sale",
            price: 198000,
            images: ["https://framerusercontent.com/images/TxUBsMONXRW8Zmgf29XgOwyAFBE.webp", "https://framerusercontent.com/images/bMg91HJevCOwyP5XL8IWnGvE.webp"],
            address: "Street 7",
            city: "Olhão",
            bedroom: 4,
            bathroom: 3,
            latitude: 37.0289,
            longitude: -7.86756,
            type: "buy",
            property: "house",
            postDetail: PostDetail(
                desc: "Nestled in the heart of Olhão, this 4-bedroom house offers a refined and practical living experience. With around 1400 sqft of usable space, the interior feels open while remaining easy to furnish and maintain. With 4 bedroom(s) and 3 bathroom(s), the property adapts well to changing household needs. Interior surfaces and fittings reflect steady upkeep, reducing the need for immediate renovation w...",
                utilities: "Heating included; electricity and water billed monthly",
                pet: "No pets permitted under building rules",
                income: "Cash or bank-financed purchases both accepted",
                size: 1400
            )
        ),
        Property(
            id: 8,
            title: "House in Loulé for sale",
            price: 174000,
            images: ["https://framerusercontent.com/images/M9TEzS8kEaXgoKgQ3VFPk3ipo.webp", "https://framerusercontent.com/images/nVpXLvCjUikE6dq1mgsikOWnRtQ.webp?scale-down-to=512"],
            address: "Street 9",
            city: "Loulé",
            bedroom: 2,
            bathroom: 2,
            latitude: 37.16649,
            longitude: -8.05009,
            type: "buy",
            property: "house",
            postDetail: PostDetail(
                desc: "In one of Loulé's established neighbourhoods, this 2-bedroom house provides a solid base for modern living. Measuring about 1800 sqft, the home offers enough room for daily routines without wasted corridors. There are 2 bedroom(s) and 2 bathroom(s), arranged to support both privacy and shared family time. Windows bring daylight into the principal rooms, creating a bright backdrop for furniture and...",
                utilities: "Heating included; electricity and water billed monthly",
                pet: "One small dog or cat allowed with extra deposit",
                income: "Cash or bank-financed purchases both accepted",
                size: 1800
            )
        ),
        Property(
            id: 13,
            title: "House in Vilamoura for sale",
            price: 453600,
            images: ["https://framerusercontent.com/images/M9TEzS8kEaXgoKgQ3VFPk3ipo.webp", "https://framerusercontent.com/images/nVpXLvCjUikE6dq1mgsikOWnRtQ.webp?scale-down-to=512"],
            address: "Street 14",
            city: "Vilamoura",
            bedroom: 1,
            bathroom: 1,
            latitude: 37.06749,
            longitude: -8.10587,
            type: "buy",
            property: "house",
            postDetail: PostDetail(
                desc: "Nestled in the heart of Vilamoura, this 1-bedroom house offers a refined and practical living experience. Measuring about 900 sqft, the home offers enough room for daily routines without wasted corridors. The sleeping wing includes 1 bedroom(s), complemented by 1 bathroom(s) for comfortable daily use. Natural light reaches the main living spaces, and the finishes are consistent with a property rea...",
                utilities: "Condo fees cover water and waste; power is metered separately",
                pet: "Pets welcome — reasonable pet deposit applies",
                income: "N/A — standard freehold / title purchase",
                size: 900
            )
        ),
        Property(
            id: 17,
            title: "House in Albufeira for sale",
            price: 237600,
            images: ["https://framerusercontent.com/images/bMg91HJevCOwyP5XL8IWnGvE.webp", "https://framerusercontent.com/images/M9TEzS8kEaXgoKgQ3VFPk3ipo.webp"],
            address: "Street 18",
            city: "Albufeira",
            bedroom: 1,
            bathroom: 1,
            latitude: 37.1138,
            longitude: -8.2737,
            type: "buy",
            property: "house",
            postDetail: PostDetail(
                desc: "Nestled in the heart of Albufeira, this 1-bedroom house offers a refined and practical living experience. Measuring about 900 sqft, the home offers enough room for daily routines without wasted corridors. The sleeping wing includes 1 bedroom(s), complemented by 1 bathroom(s) for comfortable daily use. Neutral tones and simple detailing make the interiors easy to personalise to your own style. Outs...",
                utilities: "Condo fees cover water and waste; power is metered separately",
                pet: "Small pets only (under 10 kg), deposit required",
                income: "Mortgage pre-approval recommended before formal offer",
                size: 900
            )
        ),
        Property(
            id: 3,
            title: "Apartment in Faro for rent",
            price: 1819,
            images: ["https://framerusercontent.com/images/M9TEzS8kEaXgoKgQ3VFPk3ipo.webp", "https://framerusercontent.com/images/nVpXLvCjUikE6dq1mgsikOWnRtQ.webp?scale-down-to=512"],
            address: "Street 4",
            city: "Faro",
            bedroom: 4,
            bathroom: 4,
            latitude: 36.99561,
            longitude: -7.9112,
            type: "rent",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Located in a well-connected part of Faro, this 4-bedroom apartment is designed for everyday comfort. The 700 sqft floor plan makes efficient use of every square metre, from the entrance to the private rooms. You will find 4 bedroom(s) alongside 4 bathroom(s), a practical combination for families. The overall condition suggests regular care, so new owners or tenants can focus on settling in rather ...",
                utilities: "Not included — tenant pays electricity, water and internet",
                pet: "Pets not allowed except assistance animals",
                income: "Proof of income required (approx. 3× monthly rent)",
                size: 700
            )
        ),
        Property(
            id: 14,
            title: "Apartment in Vilamoura for rent",
            price: 1560,
            images: ["https://framerusercontent.com/images/nVpXLvCjUikE6dq1mgsikOWnRtQ.webp?scale-down-to=512", "https://framerusercontent.com/images/ogbmw8amuGTcXhUz7EMeguTj1M.webp?scale-down-to=512"],
            address: "Street 15",
            city: "Vilamoura",
            bedroom: 2,
            bathroom: 1,
            latitude: 37.07158,
            longitude: -8.08503,
            type: "rent",
            property: "apartment",
            postDetail: PostDetail(
                desc: "This inviting 2-bedroom apartment in Vilamoura combines thoughtful design with a warm residential atmosphere. The layout spreads across approximately 1800 sqft, with clearly defined living, sleeping and service areas. You will find 2 bedroom(s) alongside 1 bathroom(s), a practical combination for couples. The overall condition suggests regular care, so new owners or tenants can focus on settling i...",
                utilities: "Heating included; electricity and water billed monthly",
                pet: "Small pets only (under 10 kg), deposit required",
                income: "Self-employed applicants: recent tax declaration needed",
                size: 1800
            )
        ),
        Property(
            id: 23,
            title: "Apartment in Lagoa for rent",
            price: 1760,
            images: ["https://framerusercontent.com/images/M9TEzS8kEaXgoKgQ3VFPk3ipo.webp", "https://framerusercontent.com/images/nVpXLvCjUikE6dq1mgsikOWnRtQ.webp?scale-down-to=512"],
            address: "Street 24",
            city: "Lagoa",
            bedroom: 1,
            bathroom: 1,
            latitude: 37.14265,
            longitude: -8.47285,
            type: "rent",
            property: "apartment",
            postDetail: PostDetail(
                desc: "This attractive 1-bedroom apartment in Lagoa is positioned to enjoy the best of local life and amenities. The layout spreads across approximately 1400 sqft, with clearly defined living, sleeping and service areas. With 1 bedroom(s) and 1 bathroom(s), the property adapts well to changing household needs. Neutral tones and simple detailing make the interiors easy to personalise to your own style. Ou...",
                utilities: "Not included — tenant pays electricity, water and internet",
                pet: "No pets permitted under building rules",
                income: "Guarantor accepted if income threshold is not met",
                size: 1400
            )
        ),
        Property(
            id: 24,
            title: "Apartment in Lagoa for rent",
            price: 960,
            images: ["https://framerusercontent.com/images/nVpXLvCjUikE6dq1mgsikOWnRtQ.webp?scale-down-to=512", "https://framerusercontent.com/images/ogbmw8amuGTcXhUz7EMeguTj1M.webp?scale-down-to=512"],
            address: "Street 25",
            city: "Lagoa",
            bedroom: 2,
            bathroom: 2,
            latitude: 37.11963,
            longitude: -8.45053,
            type: "rent",
            property: "apartment",
            postDetail: PostDetail(
                desc: "This attractive 2-bedroom apartment in Lagoa is positioned to enjoy the best of local life and amenities. The layout spreads across approximately 900 sqft, with clearly defined living, sleeping and service areas. With 2 bedroom(s) and 2 bathroom(s), the property adapts well to changing household needs. Natural light reaches the main living spaces, and the finishes are consistent with a property re...",
                utilities: "Utilities not included; average monthly estimate available on request",
                pet: "One small dog or cat allowed with extra deposit",
                income: "Employment contract or tax returns required for verification",
                size: 900
            )
        ),
        Property(
            id: 28,
            title: "Apartment in Praia da Rocha for rent",
            price: 1560,
            images: ["https://framerusercontent.com/images/M9TEzS8kEaXgoKgQ3VFPk3ipo.webp", "https://framerusercontent.com/images/nVpXLvCjUikE6dq1mgsikOWnRtQ.webp?scale-down-to=512"],
            address: "Street 29",
            city: "Praia da Rocha",
            bedroom: 2,
            bathroom: 1,
            latitude: 37.09589,
            longitude: -8.54309,
            type: "rent",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Set in Praia da Rocha, this 2-bedroom apartment stands out for its balance of space, light and convenience. The 1100 sqft floor plan makes efficient use of every square metre, from the entrance to the private rooms. There are 2 bedroom(s) and 1 bathroom(s), arranged to support both privacy and shared family time. Natural light reaches the main living spaces, and the finishes are consistent with a ...",
                utilities: "Heating included; electricity and water billed monthly",
                pet: "Small pets only (under 10 kg), deposit required",
                income: "Employment contract or tax returns required for verification",
                size: 1100
            )
        ),
        Property(
            id: 40,
            title: "Apartment in Sagres for rent",
            price: 1100,
            images: ["https://framerusercontent.com/images/ogbmw8amuGTcXhUz7EMeguTj1M.webp?scale-down-to=512", "https://framerusercontent.com/images/TxUBsMONXRW8Zmgf29XgOwyAFBE.webp"],
            address: "Street 41",
            city: "Sagres",
            bedroom: 1,
            bathroom: 1,
            latitude: 37.0255,
            longitude: -8.92613,
            type: "rent",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Located in a well-connected part of Sagres, this 1-bedroom apartment is designed for everyday comfort. Measuring about 1100 sqft, the home offers enough room for daily routines without wasted corridors. There are 1 bedroom(s) and 1 bathroom(s), arranged to support both privacy and shared family time. Natural light reaches the main living spaces, and the finishes are consistent with a property read...",
                utilities: "Heating included; electricity and water billed monthly",
                pet: "Small pets only (under 10 kg), deposit required",
                income: "Employment contract or tax returns required for verification",
                size: 1100
            )
        ),
        Property(
            id: 15,
            title: "House in Albufeira for rent",
            price: 3520,
            images: ["https://framerusercontent.com/images/ogbmw8amuGTcXhUz7EMeguTj1M.webp?scale-down-to=512", "https://framerusercontent.com/images/TxUBsMONXRW8Zmgf29XgOwyAFBE.webp"],
            address: "Street 16",
            city: "Albufeira",
            bedroom: 1,
            bathroom: 1,
            latitude: 37.06329,
            longitude: -8.27721,
            type: "rent",
            property: "house",
            postDetail: PostDetail(
                desc: "Nestled in the heart of Albufeira, this 1-bedroom house offers a refined and practical living experience. The 1800 sqft floor plan makes efficient use of every square metre, from the entrance to the private rooms. You will find 1 bedroom(s) alongside 1 bathroom(s), a practical combination for professionals. Interior surfaces and fittings reflect steady upkeep, reducing the need for immediate renov...",
                utilities: "Partially included — water in condo fee; electricity separate",
                pet: "No pets permitted under building rules",
                income: "Employment contract or tax returns required for verification",
                size: 1800
            )
        ),
        Property(
            id: 21,
            title: "House in Carvoeiro for rent",
            price: 960,
            images: ["https://framerusercontent.com/images/TxUBsMONXRW8Zmgf29XgOwyAFBE.webp", "https://framerusercontent.com/images/bMg91HJevCOwyP5XL8IWnGvE.webp"],
            address: "Street 22",
            city: "Carvoeiro",
            bedroom: 2,
            bathroom: 1,
            latitude: 37.12039,
            longitude: -8.46722,
            type: "rent",
            property: "house",
            postDetail: PostDetail(
                desc: "Nestled in the heart of Carvoeiro, this 2-bedroom house offers a refined and practical living experience. The 1100 sqft floor plan makes efficient use of every square metre, from the entrance to the private rooms. The sleeping wing includes 2 bedroom(s), complemented by 1 bathroom(s) for comfortable daily use. The overall condition suggests regular care, so new owners or tenants can focus on settl...",
                utilities: "Heating included; electricity and water billed monthly",
                pet: "Pets welcome — reasonable pet deposit applies",
                income: "Self-employed applicants: recent tax declaration needed",
                size: 1100
            )
        ),
        Property(
            id: 31,
            title: "House in Lagos for rent",
            price: 1400,
            images: ["https://framerusercontent.com/images/TxUBsMONXRW8Zmgf29XgOwyAFBE.webp", "https://framerusercontent.com/images/bMg91HJevCOwyP5XL8IWnGvE.webp"],
            address: "Street 32",
            city: "Lagos",
            bedroom: 4,
            bathroom: 3,
            latitude: 37.12589,
            longitude: -8.69393,
            type: "rent",
            property: "house",
            postDetail: PostDetail(
                desc: "Nestled in the heart of Lagos, this 4-bedroom house offers a refined and practical living experience. Measuring about 1800 sqft, the home offers enough room for daily routines without wasted corridors. The sleeping wing includes 4 bedroom(s), complemented by 3 bathroom(s) for comfortable daily use. Windows bring daylight into the principal rooms, creating a bright backdrop for furniture and décor....",
                utilities: "Included — water and building commons",
                pet: "One small dog or cat allowed with extra deposit",
                income: "Guarantor accepted if income threshold is not met",
                size: 1800
            )
        ),
        Property(
            id: 43,
            title: "House in Monchique for rent",
            price: 3840,
            images: ["https://framerusercontent.com/images/M9TEzS8kEaXgoKgQ3VFPk3ipo.webp", "https://framerusercontent.com/images/nVpXLvCjUikE6dq1mgsikOWnRtQ.webp?scale-down-to=512"],
            address: "Street 44",
            city: "Monchique",
            bedroom: 2,
            bathroom: 2,
            latitude: 37.33172,
            longitude: -8.57986,
            type: "rent",
            property: "house",
            postDetail: PostDetail(
                desc: "Set in Monchique, this 2-bedroom house stands out for its balance of space, light and convenience. The layout spreads across approximately 700 sqft, with clearly defined living, sleeping and service areas. With 2 bedroom(s) and 2 bathroom(s), the property adapts well to changing household needs. The overall condition suggests regular care, so new owners or tenants can focus on settling in rather t...",
                utilities: "Partially included — water in condo fee; electricity separate",
                pet: "Cats allowed; dogs considered case by case",
                income: "Self-employed applicants: recent tax declaration needed",
                size: 700
            )
        ),
        Property(
            id: 49,
            title: "House in Tavira for rent",
            price: 1560,
            images: ["https://framerusercontent.com/images/nVpXLvCjUikE6dq1mgsikOWnRtQ.webp?scale-down-to=512", "https://framerusercontent.com/images/ogbmw8amuGTcXhUz7EMeguTj1M.webp?scale-down-to=512"],
            address: "Street 50",
            city: "Tavira",
            bedroom: 2,
            bathroom: 2,
            latitude: 37.13847,
            longitude: -7.64145,
            type: "rent",
            property: "house",
            postDetail: PostDetail(
                desc: "Nestled in the heart of Tavira, this 2-bedroom house offers a refined and practical living experience. The layout spreads across approximately 1800 sqft, with clearly defined living, sleeping and service areas. With 2 bedroom(s) and 2 bathroom(s), the property adapts well to changing household needs. Neutral tones and simple detailing make the interiors easy to personalise to your own style. The s...",
                utilities: "Not included — tenant pays electricity, water and internet",
                pet: "No pets permitted under building rules",
                income: "Last three payslips and ID required before contract",
                size: 1800
            )
        ),
        Property(
            id: 61,
            title: "House in Santa Luzia for rent",
            price: 2800,
            images: ["https://framerusercontent.com/images/TxUBsMONXRW8Zmgf29XgOwyAFBE.webp", "https://framerusercontent.com/images/bMg91HJevCOwyP5XL8IWnGvE.webp"],
            address: "Street 62",
            city: "Santa Luzia",
            bedroom: 4,
            bathroom: 3,
            latitude: 37.12246,
            longitude: -7.6945,
            type: "rent",
            property: "house",
            postDetail: PostDetail(
                desc: "Nestled in the heart of Santa Luzia, this 4-bedroom house offers a refined and practical living experience. The 900 sqft floor plan makes efficient use of every square metre, from the entrance to the private rooms. You will find 4 bedroom(s) alongside 3 bathroom(s), a practical combination for families. Natural light reaches the main living spaces, and the finishes are consistent with a property r...",
                utilities: "Not included — tenant pays electricity, water and internet",
                pet: "Pets welcome — reasonable pet deposit applies",
                income: "Guarantor accepted if income threshold is not met",
                size: 900
            )
        )
    ]
}