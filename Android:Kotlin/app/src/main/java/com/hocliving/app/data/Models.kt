package com.hocliving.app.data

data class PostDetail(
    val desc: String = "",
    val utilities: String = "",
    val pet: String = "",
    val income: String = "",
    val size: Int = 0
)

data class Property(
    val id: Int,
    val title: String,
    val price: Int,
    val images: List<String>,
    val address: String,
    val city: String,
    val country: String = "",
    val bedroom: Int,
    val bathroom: Int,
    val latitude: Double,
    val longitude: Double,
    val type: String,
    val property: String,
    val postDetail: PostDetail = PostDetail()
) {
    /** Web JSON uses string ids like "ICE-REY-1" — keep numeric hash for nav if needed */
    companion object {
        fun idFromAny(raw: Any?): Int {
            return when (raw) {
                is Int -> raw
                is Number -> raw.toInt()
                is String -> raw.hashCode() and 0x7fffffff
                else -> 0
            }
        }
    }
}

data class CountryEntry(
    val country: String,
    val file: String,
    val count: Int = 0
)

data class Manifest(
    val total: Int = 0,
    val countries: List<CountryEntry> = emptyList()
)

data class CityRow(
    val city: String,
    val country: String,
    val count: Int = 0,
    val latitude: Double = 0.0,
    val longitude: Double = 0.0
)

sealed class SearchSuggestion {
    data class Country(val name: String) : SearchSuggestion()
    data class City(val city: String, val country: String) : SearchSuggestion()
}
