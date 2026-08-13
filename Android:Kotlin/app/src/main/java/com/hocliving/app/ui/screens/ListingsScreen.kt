package com.hocliving.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.FilterList
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.hocliving.app.data.ListingsRepository
import com.hocliving.app.data.Property
import com.hocliving.app.ui.components.PropertyCard
import com.hocliving.app.ui.theme.TealPrimary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ListingsScreen(
    onBack: () -> Unit,
    onPropertyClick: (Int) -> Unit
) {
    var typeFilter by remember { mutableStateOf("all") }
    var propertyFilter by remember { mutableStateOf("all") }
    var bedroomsFilter by remember { mutableStateOf(0) }
    var showFilters by remember { mutableStateOf(false) }
    var countries by remember { mutableStateOf(listOf("Germany")) }
    var activeCountry by remember { mutableStateOf("Germany") }
    var posts by remember { mutableStateOf<List<Property>>(emptyList()) }
    var loading by remember { mutableStateOf(true) }
    var error by remember { mutableStateOf<String?>(null) }
    var countryExpanded by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        try {
            countries = ListingsRepository.countryNames().ifEmpty { listOf("Germany") }
            if (activeCountry !in countries) activeCountry = countries.first()
        } catch (_: Exception) {
            countries = listOf("Germany")
        }
    }

    LaunchedEffect(activeCountry) {
        loading = true
        error = null
        try {
            posts = ListingsRepository.loadCountry(activeCountry)
        } catch (_: Exception) {
            error = "Could not load $activeCountry — showing offline sample"
            posts = ListingsRepository.fallbackSample()
        } finally {
            loading = false
        }
    }

    val filtered = remember(posts, typeFilter, propertyFilter, bedroomsFilter) {
        posts.filter { p ->
            (typeFilter == "all" || p.type == typeFilter) &&
            (propertyFilter == "all" || p.property == propertyFilter) &&
            (bedroomsFilter == 0 || p.bedroom >= bedroomsFilter)
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Listings", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, "Back")
                    }
                },
                actions = {
                    IconButton(onClick = { showFilters = !showFilters }) {
                        Icon(Icons.Default.FilterList, "Filters")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        }
    ) { padding ->
        Column(Modifier.fillMaxSize().padding(padding)) {
            Card(
                modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(Modifier.padding(12.dp)) {
                    Text("Country", style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(6.dp))
                    ExposedDropdownMenuBox(
                        expanded = countryExpanded,
                        onExpandedChange = { countryExpanded = it }
                    ) {
                        OutlinedTextField(
                            value = activeCountry,
                            onValueChange = {},
                            readOnly = true,
                            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(countryExpanded) },
                            modifier = Modifier.menuAnchor().fillMaxWidth(),
                            shape = RoundedCornerShape(10.dp)
                        )
                        ExposedDropdownMenu(
                            expanded = countryExpanded,
                            onDismissRequest = { countryExpanded = false }
                        ) {
                            countries.forEach { c ->
                                DropdownMenuItem(
                                    text = { Text(c) },
                                    onClick = {
                                        activeCountry = c
                                        countryExpanded = false
                                    }
                                )
                            }
                        }
                    }
                    Text(
                        "Same catalog as Web · Europe-wide",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(top = 4.dp)
                    )
                }
            }

            if (showFilters) {
                Card(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
                ) {
                    Column(Modifier.padding(12.dp)) {
                        Text("Type", style = MaterialTheme.typography.labelLarge)
                        Spacer(Modifier.height(6.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Chip("All", typeFilter == "all") { typeFilter = "all" }
                            Chip("Buy", typeFilter == "buy") { typeFilter = "buy" }
                            Chip("Rent", typeFilter == "rent") { typeFilter = "rent" }
                        }
                        Spacer(Modifier.height(12.dp))
                        Text("Property", style = MaterialTheme.typography.labelLarge)
                        Spacer(Modifier.height(6.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Chip("All", propertyFilter == "all") { propertyFilter = "all" }
                            Chip("Apartment", propertyFilter == "apartment") { propertyFilter = "apartment" }
                            Chip("House", propertyFilter == "house") { propertyFilter = "house" }
                        }
                        Spacer(Modifier.height(12.dp))
                        Text("Min bedrooms", style = MaterialTheme.typography.labelLarge)
                        Spacer(Modifier.height(6.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            listOf(0, 1, 2, 3, 4).forEach { n ->
                                Chip(if (n == 0) "Any" else "$n+", bedroomsFilter == n) { bedroomsFilter = n }
                            }
                        }
                    }
                }
            }

            when {
                loading -> Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        CircularProgressIndicator(color = TealPrimary)
                        Spacer(Modifier.height(12.dp))
                        Text("Loading $activeCountry listings…")
                    }
                }
                else -> {
                    if (error != null) {
                        Text(
                            error!!,
                            color = MaterialTheme.colorScheme.error,
                            modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp),
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                    Text(
                        "${filtered.size} properties found · $activeCountry",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
                    )
                    LazyColumn(
                        contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        items(filtered, key = { it.id }) { property ->
                            PropertyCard(property = property, onClick = { onPropertyClick(property.id) })
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun Chip(label: String, selected: Boolean, onClick: () -> Unit) {
    FilterChip(
        selected = selected,
        onClick = onClick,
        label = { Text(label) },
        colors = FilterChipDefaults.filterChipColors(
            selectedContainerColor = TealPrimary,
            selectedLabelColor = MaterialTheme.colorScheme.onPrimary
        )
    )
}
