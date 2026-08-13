package com.hocliving.app.data

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

/**
 * Same Europe catalog as Web — loads from Vercel static data.
 */
object ListingsRepository {
    const val BASE_URL = "https://hoc-living-faro-real-estate-web-app.vercel.app"

    private var manifest: Manifest? = null
    private var citiesCache: List<CityRow>? = null
    private val countryCache = mutableMapOf<String, List<Property>>()
    /** id string from JSON -> Property for detail lookup */
    private val byRemoteId = mutableMapOf<String, Property>()

    suspend fun getManifest(): Manifest = withContext(Dispatchers.IO) {
        manifest?.let { return@withContext it }
        val json = fetchJson("$BASE_URL/data/index.json")
        val root = JSONObject(json)
        val arr = root.optJSONArray("countries") ?: JSONArray()
        val list = mutableListOf<CountryEntry>()
        for (i in 0 until arr.length()) {
            val o = arr.getJSONObject(i)
            list.add(
                CountryEntry(
                    country = o.optString("country"),
                    file = o.optString("file"),
                    count = o.optInt("count")
                )
            )
        }
        Manifest(total = root.optInt("total"), countries = list).also { manifest = it }
    }

    suspend fun loadCities(): List<CityRow> = withContext(Dispatchers.IO) {
        citiesCache?.let { return@withContext it }
        try {
            val json = fetchJson("$BASE_URL/data/cities.json")
            val arr = JSONArray(json)
            val list = mutableListOf<CityRow>()
            for (i in 0 until arr.length()) {
                val o = arr.getJSONObject(i)
                list.add(
                    CityRow(
                        city = o.optString("city"),
                        country = o.optString("country"),
                        count = o.optInt("count"),
                        latitude = o.optDouble("latitude"),
                        longitude = o.optDouble("longitude")
                    )
                )
            }
            citiesCache = list
            list
        } catch (_: Exception) {
            emptyList()
        }
    }

    suspend fun countryNames(): List<String> = getManifest().countries.map { it.country }

    suspend fun loadCountry(country: String): List<Property> = withContext(Dispatchers.IO) {
        val key = country.trim()
        countryCache[key]?.let { return@withContext it }
        val m = getManifest()
        val entry = m.countries.find { it.country.equals(key, ignoreCase = true) }
            ?: return@withContext emptyList()
        val path = when {
            entry.file.startsWith("http") -> entry.file
            entry.file.startsWith("/") -> "$BASE_URL${entry.file}"
            else -> "$BASE_URL/${entry.file}"
        }
        val json = fetchJson(path)
        val arr = JSONArray(json)
        val list = mutableListOf<Property>()
        for (i in 0 until arr.length()) {
            val p = parseProperty(arr.getJSONObject(i))
            list.add(p)
            byRemoteId[arr.getJSONObject(i).opt("id").toString()] = p
        }
        countryCache[key] = list
        list
    }

    fun findByLocalId(id: Int): Property? {
        countryCache.values.forEach { list ->
            list.find { it.id == id }?.let { return it }
        }
        return SampleData.properties.find { it.id == id }
    }

    /** Suggestions for home search — city or country */
    suspend fun suggestions(query: String, limit: Int = 12): List<SearchSuggestion> {
        val q = query.trim().lowercase()
        if (q.isEmpty()) return emptyList()
        val cities = try { loadCities() } catch (_: Exception) { emptyList() }
        val countries = try { countryNames() } catch (_: Exception) {
            cities.map { it.country }.distinct()
        }
        val out = mutableListOf<SearchSuggestion>()
        countries.filter { it.lowercase().contains(q) }
            .sortedBy { if (it.lowercase().startsWith(q)) 0 else 1 }
            .forEach { out.add(SearchSuggestion.Country(it)) }
        cities.filter {
            it.city.lowercase().contains(q) || it.country.lowercase().contains(q)
        }.sortedBy { if (it.city.lowercase().startsWith(q)) 0 else 1 }
            .forEach { out.add(SearchSuggestion.City(it.city, it.country)) }
        return out.distinctBy {
            when (it) {
                is SearchSuggestion.Country -> "c:${it.name}"
                is SearchSuggestion.City -> "y:${it.city}|${it.country}"
            }
        }.take(limit)
    }

    fun filterProperties(
        posts: List<Property>,
        query: String = "",
        type: String = "all",
        property: String = "all",
        minBedrooms: Int = 0
    ): List<Property> {
        val q = query.trim().lowercase()
        val exactCity = if (q.isNotEmpty() && posts.any { it.city.equals(q, true) }) q else null
        return posts.filter { p ->
            when {
                exactCity != null -> p.city.equals(exactCity, true)
                q.isNotEmpty() -> {
                    val searchable = "${p.title} ${p.address} ${p.city} ${p.country}".lowercase()
                    searchable.contains(q)
                }
                else -> true
            } && (type == "all" || p.type == type) &&
                (property == "all" || p.property == property) &&
                (minBedrooms == 0 || p.bedroom >= minBedrooms)
        }
    }

    fun fallbackSample(): List<Property> = SampleData.properties

    private fun fetchJson(urlStr: String): String {
        val conn = (URL(urlStr).openConnection() as HttpURLConnection).apply {
            connectTimeout = 20000
            readTimeout = 90000
            requestMethod = "GET"
            setRequestProperty("Accept", "application/json")
        }
        return try {
            conn.inputStream.bufferedReader().use { it.readText() }
        } finally {
            conn.disconnect()
        }
    }

    private fun parseProperty(o: JSONObject): Property {
        val imagesArr = o.optJSONArray("images") ?: JSONArray()
        val images = (0 until imagesArr.length()).map { imagesArr.getString(it) }
        val pd = o.optJSONObject("postDetail")
        val rawId = o.opt("id")
        val id = when (rawId) {
            is Int -> rawId
            is Number -> rawId.toInt()
            is String -> {
                // Prefer trailing number: ICE-REY-1 -> stable unique via hash
                (rawId.hashCode() and 0x7fffffff)
            }
            else -> 0
        }
        return Property(
            id = id,
            title = o.optString("title"),
            price = o.optInt("price"),
            images = images,
            address = o.optString("address"),
            city = o.optString("city"),
            country = o.optString("country"),
            bedroom = o.optInt("bedroom"),
            bathroom = o.optInt("bathroom"),
            latitude = o.optDouble("latitude"),
            longitude = o.optDouble("longitude"),
            type = o.optString("type"),
            property = o.optString("property"),
            postDetail = PostDetail(
                desc = pd?.optString("desc") ?: "",
                utilities = pd?.optString("utilities") ?: "",
                pet = pd?.optString("pet") ?: "",
                income = pd?.optString("income") ?: "",
                size = pd?.optInt("size") ?: 0
            )
        )
    }
}
