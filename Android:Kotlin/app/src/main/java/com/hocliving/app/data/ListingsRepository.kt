package com.hocliving.app.data

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

/**
 * Loads the same Europe-wide catalog as the Web app from the deployed static data.
 * Base URL points to the live Vercel deployment of the Web project.
 */
object ListingsRepository {
    const val BASE_URL = "https://hoc-living-faro-real-estate-web-app.vercel.app"

    private var manifest: Manifest? = null
    private val countryCache = mutableMapOf<String, List<Property>>()

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

    suspend fun loadCountry(country: String): List<Property> = withContext(Dispatchers.IO) {
        val key = country.trim()
        countryCache[key]?.let { return@withContext it }
        val m = getManifest()
        val entry = m.countries.find { it.country.equals(key, ignoreCase = true) }
            ?: return@withContext emptyList()
        val path = if (entry.file.startsWith("http")) entry.file
        else if (entry.file.startsWith("/")) "$BASE_URL${entry.file}"
        else "$BASE_URL/${entry.file}"
        val json = fetchJson(path)
        val arr = JSONArray(json)
        val list = mutableListOf<Property>()
        for (i in 0 until arr.length()) {
            list.add(parseProperty(arr.getJSONObject(i)))
        }
        countryCache[key] = list
        list
    }

    suspend fun countryNames(): List<String> = getManifest().countries.map { it.country }

    /** Small offline fallback sample (Germany) if network fails. */
    fun fallbackSample(): List<Property> = SampleData.properties

    private fun fetchJson(urlStr: String): String {
        val conn = (URL(urlStr).openConnection() as HttpURLConnection).apply {
            connectTimeout = 20000
            readTimeout = 60000
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
        return Property(
            id = o.optInt("id"),
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
