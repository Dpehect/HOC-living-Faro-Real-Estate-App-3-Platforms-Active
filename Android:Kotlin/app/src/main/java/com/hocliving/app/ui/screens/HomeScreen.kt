package com.hocliving.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.outlined.Apartment
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.LocationCity
import androidx.compose.material.icons.outlined.ThumbUp
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.hocliving.app.data.SampleData
import com.hocliving.app.ui.components.PropertyCard
import com.hocliving.app.ui.theme.TealContainer
import com.hocliving.app.ui.theme.TealPrimary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    onBrowseListings: () -> Unit,
    onPropertyClick: (Int) -> Unit
) {
    val featured = SampleData.properties.take(6)

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
                    modifier = Modifier.fillMaxWidth()
                        .background(TealContainer.copy(alpha = 0.4f))
                        .padding(20.dp)
                ) {
                    Text(
                        "Homes across München & Bayern, centered in München",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(Modifier.height(8.dp))
                    Text(
                        "Search live listings — from München apartments to homes in Schwabing, Maxvorstadt and beyond.",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(Modifier.height(16.dp))
                    OutlinedTextField(
                        value = "",
                        onValueChange = {},
                        placeholder = { Text("Search properties in your city") },
                        leadingIcon = { Icon(Icons.Default.Search, null) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        singleLine = true,
                        readOnly = true
                    )
                    Spacer(Modifier.height(12.dp))
                    Button(
                        onClick = onBrowseListings,
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = TealPrimary)
                    ) {
                        Text("Browse all listings", modifier = Modifier.padding(vertical = 4.dp))
                    }
                }
            }
            item {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 20.dp),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    StatCard(Icons.Outlined.Home, "1,098", "Listings", Modifier.weight(1f))
                    StatCard(Icons.Outlined.LocationCity, "539", "Cities", Modifier.weight(1f))
                    StatCard(Icons.Outlined.ThumbUp, "482", "For rent", Modifier.weight(1f))
                }
            }
            item {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("Featured properties", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
                    TextButton(onClick = onBrowseListings) { Text("See all") }
                }
            }
            items(featured) { property ->
                PropertyCard(
                    property = property,
                    onClick = { onPropertyClick(property.id) },
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
                )
            }
            item {
                Column(Modifier.fillMaxWidth().padding(16.dp)) {
                    Text("Why HOC Living?", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(12.dp))
                    FeatureRow(Icons.Outlined.Apartment, "Local expertise", "Deep knowledge of München and surroundings market.")
                    FeatureRow(Icons.Outlined.Home, "Verified listings", "Every property is carefully reviewed.")
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
