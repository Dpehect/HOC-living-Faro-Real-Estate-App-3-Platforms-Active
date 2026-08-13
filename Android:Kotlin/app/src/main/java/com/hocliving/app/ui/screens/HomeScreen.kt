package com.hocliving.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.outlined.Apartment
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Public
import androidx.compose.material.icons.outlined.ThumbUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.hocliving.app.data.ListingsRepository
import com.hocliving.app.data.Property
import com.hocliving.app.data.SearchSuggestion
import com.hocliving.app.ui.components.PropertyCard
import com.hocliving.app.ui.theme.TealContainer
import com.hocliving.app.ui.theme.TealPrimary
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    onBrowseListings: (country: String, q: String) -> Unit,
    onPropertyClick: (Int) -> Unit
) {
    var featured by remember { mutableStateOf<List<Property>>(emptyList()) }
    var loading by remember { mutableStateOf(true) }
    var query by remember { mutableStateOf("") }
    var suggestions by remember { mutableStateOf<List<SearchSuggestion>>(emptyList()) }
    var showSuggestions by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()
    var suggestJob by remember { mutableStateOf<Job?>(null) }

    LaunchedEffect(Unit) {
        loading = true
        try {
            featured = ListingsRepository.loadCountry("Germany").take(6)
        } catch (_: Exception) {
            featured = ListingsRepository.fallbackSample().take(6)
        } finally {
            loading = false
        }
    }

    fun onQueryChange(text: String) {
        query = text
        suggestJob?.cancel()
        if (text.isBlank()) {
            suggestions = emptyList()
            showSuggestions = false
            return
        }
        suggestJob = scope.launch {
            delay(200)
            suggestions = ListingsRepository.suggestions(text)
            showSuggestions = suggestions.isNotEmpty()
        }
    }

    fun goSearch(s: SearchSuggestion? = null) {
        showSuggestions = false
        when (s) {
            is SearchSuggestion.Country -> onBrowseListings(s.name, "")
            is SearchSuggestion.City -> onBrowseListings(s.country, s.city)
            null -> {
                val q = query.trim()
                if (q.isEmpty()) {
                    onBrowseListings("Germany", "")
                    return
                }
                scope.launch {
                    val hits = ListingsRepository.suggestions(q, 1)
                    when (val h = hits.firstOrNull()) {
                        is SearchSuggestion.Country -> onBrowseListings(h.name, "")
                        is SearchSuggestion.City -> onBrowseListings(h.country, h.city)
                        null -> onBrowseListings("Germany", q)
                    }
                }
            }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("HOC Living", fontWeight = FontWeight.Bold, color = TealPrimary) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier.fillMaxSize().padding(padding),
            contentPadding = PaddingValues(bottom = 24.dp)
        ) {
            item {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(TealContainer.copy(alpha = 0.4f))
                        .padding(20.dp)
                ) {
                    Text(
                        "Homes across Europe",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(Modifier.height(8.dp))
                    Text(
                        "Search 300,000 live listings across 30 European countries",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(Modifier.height(16.dp))
                    OutlinedTextField(
                        value = query,
                        onValueChange = { onQueryChange(it) },
                        placeholder = { Text("Search city or country (e.g. Reykjavik)") },
                        leadingIcon = { Icon(Icons.Default.Search, null) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        singleLine = true
                    )
                    if (showSuggestions && suggestions.isNotEmpty()) {
                        Card(
                            modifier = Modifier.fillMaxWidth().padding(top = 4.dp),
                            shape = RoundedCornerShape(12.dp),
                            elevation = CardDefaults.cardElevation(4.dp)
                        ) {
                            Column {
                                suggestions.forEach { s ->
                                    val label = when (s) {
                                        is SearchSuggestion.Country -> s.name
                                        is SearchSuggestion.City -> "${s.city}, ${s.country}"
                                    }
                                    val kind = when (s) {
                                        is SearchSuggestion.Country -> "Country"
                                        is SearchSuggestion.City -> "City"
                                    }
                                    Row(
                                        Modifier
                                            .fillMaxWidth()
                                            .clickable { goSearch(s) }
                                            .padding(horizontal = 14.dp, vertical = 12.dp),
                                        horizontalArrangement = Arrangement.SpaceBetween
                                    ) {
                                        Text(label, fontWeight = FontWeight.Medium)
                                        Text(kind, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    }
                                    HorizontalDivider()
                                }
                            }
                        }
                    }
                    Spacer(Modifier.height(12.dp))
                    Button(
                        onClick = { goSearch(null) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = TealPrimary)
                    ) {
                        Text("Search", modifier = Modifier.padding(vertical = 4.dp))
                    }
                    TextButton(
                        onClick = { onBrowseListings("Germany", "") },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Browse all listings")
                    }
                }
            }
            item {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 20.dp),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    StatCard(Icons.Outlined.Home, "300k", "Listings", Modifier.weight(1f))
                    StatCard(Icons.Outlined.Public, "30", "Countries", Modifier.weight(1f))
                    StatCard(Icons.Outlined.ThumbUp, "60k", "For rent", Modifier.weight(1f))
                }
            }
            item {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("Featured properties", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
                    TextButton(onClick = { onBrowseListings("Germany", "") }) { Text("See all") }
                }
            }
            if (loading) {
                item {
                    Box(Modifier.fillMaxWidth().padding(32.dp), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator(color = TealPrimary)
                    }
                }
            } else {
                items(featured, key = { it.id }) { property ->
                    PropertyCard(
                        property = property,
                        onClick = { onPropertyClick(property.id) },
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
                    )
                }
            }
            item {
                Column(Modifier.fillMaxWidth().padding(16.dp)) {
                    Text("Why HOC Living?", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(12.dp))
                    FeatureRow(Icons.Outlined.Public, "Europe-wide coverage", "30 countries · 300,000 live listings.")
                    FeatureRow(Icons.Outlined.Apartment, "Verified listings", "Every property is carefully reviewed.")
                    FeatureRow(Icons.Outlined.ThumbUp, "End-to-end support", "From search to keys in hand.")
                }
            }
        }
    }
}

@Composable
private fun StatCard(icon: ImageVector, value: String, label: String, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(1.dp)
    ) {
        Column(Modifier.fillMaxWidth().padding(12.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Icon(icon, null, tint = TealPrimary)
            Spacer(Modifier.height(6.dp))
            Text(value, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
            Text(label, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, textAlign = TextAlign.Center)
        }
    }
}

@Composable
private fun FeatureRow(icon: ImageVector, title: String, subtitle: String) {
    Row(Modifier.fillMaxWidth().padding(vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
        Box(
            Modifier.size(44.dp).clip(RoundedCornerShape(10.dp)).background(TealContainer),
            contentAlignment = Alignment.Center
        ) { Icon(icon, null, tint = TealPrimary) }
        Spacer(Modifier.width(12.dp))
        Column {
            Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Medium)
            Text(subtitle, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}
