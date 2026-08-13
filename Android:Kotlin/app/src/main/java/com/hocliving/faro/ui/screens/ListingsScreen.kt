package com.hocliving.faro.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.FilterList
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.hocliving.faro.data.SampleData
import com.hocliving.faro.ui.components.PropertyCard
import com.hocliving.faro.ui.theme.TealPrimary

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

    val filtered = remember(typeFilter, propertyFilter, bedroomsFilter) {
        SampleData.properties.filter { p ->
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
                            FilterChip("All", typeFilter == "all") { typeFilter = "all" }
                            FilterChip("Buy", typeFilter == "buy") { typeFilter = "buy" }
                            FilterChip("Rent", typeFilter == "rent") { typeFilter = "rent" }
                        }
                        Spacer(Modifier.height(12.dp))
                        Text("Property", style = MaterialTheme.typography.labelLarge)
                        Spacer(Modifier.height(6.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            FilterChip("All", propertyFilter == "all") { propertyFilter = "all" }
                            FilterChip("Apartment", propertyFilter == "apartment") { propertyFilter = "apartment" }
                            FilterChip("House", propertyFilter == "house") { propertyFilter = "house" }
                        }
                        Spacer(Modifier.height(12.dp))
                        Text("Min bedrooms", style = MaterialTheme.typography.labelLarge)
                        Spacer(Modifier.height(6.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            listOf(0, 1, 2, 3, 4).forEach { n ->
                                FilterChip(if (n == 0) "Any" else "$n+", bedroomsFilter == n) { bedroomsFilter = n }
                            }
                        }
                    }
                }
            }
            Text(
                "${filtered.size} properties found",
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

@Composable
private fun FilterChip(label: String, selected: Boolean, onClick: () -> Unit) {
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
