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
    let type: String
    let property: String
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
            title: "Apartment in M\u00fcnchen for sale",
            price: 485000,
            images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3be61?w=800"],
            address: "Leopoldstra\u00dfe 12",
            city: "M\u00fcnchen",
            bedroom: 2,
            bathroom: 1,
            latitude: 48.158,
            longitude: 11.585,
            type: "buy",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Bright 2-bedroom apartment in Schwabing with excellent public transport links and caf\u00e9s nearby.",
                utilities: "Standard ownership",
                pet: "No restriction",
                income: "Cash or financed",
                size: 85
            )
        ),
        Property(
            id: 2,
            title: "House in M\u00fcnchen for sale",
            price: 1250000,
            images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
            address: "Bogenhausen Allee 8",
            city: "M\u00fcnchen",
            bedroom: 4,
            bathroom: 3,
            latitude: 48.148,
            longitude: 11.607,
            type: "buy",
            property: "house",
            postDetail: PostDetail(
                desc: "Family house in Bogenhausen with garden, quiet street and easy access to the English Garden.",
                utilities: "Standard ownership",
                pet: "No restriction",
                income: "Cash or financed",
                size: 210
            )
        ),
        Property(
            id: 3,
            title: "Apartment in M\u00fcnchen for rent",
            price: 1850,
            images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"],
            address: "Maximilianstra\u00dfe 22",
            city: "M\u00fcnchen",
            bedroom: 2,
            bathroom: 1,
            latitude: 48.139,
            longitude: 11.587,
            type: "rent",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Modern rental in Maxvorstadt, close to universities and museums. Fully furnished option available.",
                utilities: "Nebenkosten nicht inbegriffen",
                pet: "Kleine Haustiere nach Absprache",
                income: "Einkommensnachweis erforderlich",
                size: 72
            )
        ),
        Property(
            id: 4,
            title: "Apartment in M\u00fcnchen for sale",
            price: 620000,
            images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"],
            address: "Sendlinger Stra\u00dfe 45",
            city: "M\u00fcnchen",
            bedroom: 3,
            bathroom: 2,
            latitude: 48.134,
            longitude: 11.567,
            type: "buy",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Spacious 3-bed near Sendlinger Tor with balcony and underground parking.",
                utilities: "Standard ownership",
                pet: "No restriction",
                income: "Cash or financed",
                size: 110
            )
        ),
        Property(
            id: 5,
            title: "House in M\u00fcnchen for rent",
            price: 3200,
            images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?w=800"],
            address: "Harlaching Weg 3",
            city: "M\u00fcnchen",
            bedroom: 5,
            bathroom: 3,
            latitude: 48.1,
            longitude: 11.57,
            type: "rent",
            property: "house",
            postDetail: PostDetail(
                desc: "Large family home in Harlaching with terrace and green surroundings.",
                utilities: "Nebenkosten nicht inbegriffen",
                pet: "Kleine Haustiere nach Absprache",
                income: "Einkommensnachweis erforderlich",
                size: 240
            )
        ),
        Property(
            id: 6,
            title: "Apartment in M\u00fcnchen for rent",
            price: 1450,
            images: ["https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"],
            address: "Giesinger Bahnhofplatz 1",
            city: "M\u00fcnchen",
            bedroom: 1,
            bathroom: 1,
            latitude: 48.116,
            longitude: 11.595,
            type: "rent",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Compact studio-style flat near Giesing station, ideal for professionals.",
                utilities: "Nebenkosten nicht inbegriffen",
                pet: "Kleine Haustiere nach Absprache",
                income: "Einkommensnachweis erforderlich",
                size: 48
            )
        ),
        Property(
            id: 7,
            title: "Apartment in M\u00fcnchen for sale",
            price: 890000,
            images: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"],
            address: "Nymphenburger Stra\u00dfe 90",
            city: "M\u00fcnchen",
            bedroom: 3,
            bathroom: 2,
            latitude: 48.155,
            longitude: 11.535,
            type: "buy",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Elegant apartment near Schloss Nymphenburg with high ceilings and parquet floors.",
                utilities: "Standard ownership",
                pet: "No restriction",
                income: "Cash or financed",
                size: 125
            )
        ),
        Property(
            id: 8,
            title: "House in M\u00fcnchen for sale",
            price: 2100000,
            images: ["https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"],
            address: "Gr\u00fcnwald Residenz 2",
            city: "M\u00fcnchen",
            bedroom: 6,
            bathroom: 4,
            latitude: 48.045,
            longitude: 11.52,
            type: "buy",
            property: "house",
            postDetail: PostDetail(
                desc: "Premium villa in Gr\u00fcnwald area with pool, garage and privacy.",
                utilities: "Standard ownership",
                pet: "No restriction",
                income: "Cash or financed",
                size: 320
            )
        ),
        Property(
            id: 9,
            title: "Apartment in M\u00fcnchen for rent",
            price: 2100,
            images: ["https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800", "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800"],
            address: "Isarvorstadt Kirchplatz 5",
            city: "M\u00fcnchen",
            bedroom: 2,
            bathroom: 1,
            latitude: 48.128,
            longitude: 11.575,
            type: "rent",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Stylish 2-bed in Isarvorstadt, walking distance to the Isar and nightlife.",
                utilities: "Nebenkosten nicht inbegriffen",
                pet: "Kleine Haustiere nach Absprache",
                income: "Einkommensnachweis erforderlich",
                size: 78
            )
        ),
        Property(
            id: 10,
            title: "Apartment in M\u00fcnchen for sale",
            price: 540000,
            images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800", "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800"],
            address: "Pasing Marienplatz 7",
            city: "M\u00fcnchen",
            bedroom: 2,
            bathroom: 1,
            latitude: 48.148,
            longitude: 11.46,
            type: "buy",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Well-kept apartment in Pasing with good S-Bahn connections to the centre.",
                utilities: "Standard ownership",
                pet: "No restriction",
                income: "Cash or financed",
                size: 90
            )
        ),
        Property(
            id: 11,
            title: "House in M\u00fcnchen for rent",
            price: 2800,
            images: ["https://images.unsplash.com/photo-1600047509358-9dc7556c2265?w=800", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"],
            address: "Trudering Waldstra\u00dfe 14",
            city: "M\u00fcnchen",
            bedroom: 4,
            bathroom: 2,
            latitude: 48.12,
            longitude: 11.67,
            type: "rent",
            property: "house",
            postDetail: PostDetail(
                desc: "Detached house in Trudering with garden and quiet residential character.",
                utilities: "Nebenkosten nicht inbegriffen",
                pet: "Kleine Haustiere nach Absprache",
                income: "Einkommensnachweis erforderlich",
                size: 180
            )
        ),
        Property(
            id: 12,
            title: "Apartment in M\u00fcnchen for sale",
            price: 710000,
            images: ["https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800", "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800"],
            address: "Haidhausen Rosenheimer 33",
            city: "M\u00fcnchen",
            bedroom: 3,
            bathroom: 2,
            latitude: 48.13,
            longitude: 11.595,
            type: "buy",
            property: "apartment",
            postDetail: PostDetail(
                desc: "Character apartment in Haidhausen, close to the Gasteig and French Quarter.",
                utilities: "Standard ownership",
                pet: "No restriction",
                income: "Cash or financed",
                size: 105
            )
        )
    ]
}