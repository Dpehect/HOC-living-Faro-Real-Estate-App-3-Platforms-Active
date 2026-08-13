import Foundation

struct PostDetail: Identifiable, Codable, Hashable {
    var id: String { desc.prefix(20) + String(size) }
    let desc: String
    let utilities: String
    let pet: String
    let income: String
    let size: Int
}

struct Property: Identifiable, Hashable {
    let id: String
    let title: String
    let price: Int
    let images: [String]
    let address: String
    let city: String
    var country: String = ""
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
    var locationLine: String {
        [address, city, country].filter { !$0.isEmpty }.joined(separator: ", ")
    }

    init(id: String, title: String, price: Int, images: [String], address: String, city: String, country: String = "", bedroom: Int, bathroom: Int, latitude: Double, longitude: Double, type: String, property: String, postDetail: PostDetail) {
        self.id = id
        self.title = title
        self.price = price
        self.images = images
        self.address = address
        self.city = city
        self.country = country
        self.bedroom = bedroom
        self.bathroom = bathroom
        self.latitude = latitude
        self.longitude = longitude
        self.type = type
        self.property = property
        self.postDetail = postDetail
    }
}

extension Property: Codable {
    enum CodingKeys: String, CodingKey {
        case id, title, price, images, address, city, country, bedroom, bathroom
        case latitude, longitude, type, property, postDetail
    }
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        if let s = try? c.decode(String.self, forKey: .id) {
            id = s
        } else if let n = try? c.decode(Int.self, forKey: .id) {
            id = String(n)
        } else {
            id = UUID().uuidString
        }
        title = try c.decode(String.self, forKey: .title)
        price = try c.decode(Int.self, forKey: .price)
        images = try c.decode([String].self, forKey: .images)
        address = try c.decode(String.self, forKey: .address)
        city = try c.decode(String.self, forKey: .city)
        country = try c.decodeIfPresent(String.self, forKey: .country) ?? ""
        bedroom = try c.decode(Int.self, forKey: .bedroom)
        bathroom = try c.decode(Int.self, forKey: .bathroom)
        latitude = try c.decode(Double.self, forKey: .latitude)
        longitude = try c.decode(Double.self, forKey: .longitude)
        type = try c.decode(String.self, forKey: .type)
        property = try c.decode(String.self, forKey: .property)
        postDetail = try c.decode(PostDetail.self, forKey: .postDetail)
    }
}

struct CountryEntry: Codable {
    let country: String
    let file: String
    let count: Int?
}

struct Manifest: Codable {
    let total: Int?
    let countries: [CountryEntry]
}

struct CityRow: Codable, Hashable {
    let city: String
    let country: String
    let count: Int?
    let latitude: Double?
    let longitude: Double?
}

enum SearchSuggestion: Hashable {
    case country(String)
    case city(city: String, country: String)
    var label: String {
        switch self {
        case .country(let n): return n
        case .city(let c, let co): return "\(c), \(co)"
        }
    }
    var kind: String {
        switch self {
        case .country: return "Country"
        case .city: return "City"
        }
    }
}
