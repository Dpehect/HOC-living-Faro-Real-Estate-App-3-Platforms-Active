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
)

data class CountryEntry(
    val country: String,
    val file: String,
    val count: Int = 0
)

data class Manifest(
    val total: Int = 0,
    val countries: List<CountryEntry> = emptyList()
)
