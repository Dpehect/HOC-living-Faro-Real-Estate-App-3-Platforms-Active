package com.hocliving.app.ui.screens

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.hocliving.app.data.ListingsRepository
import com.hocliving.app.data.Property
import com.hocliving.app.data.SampleData
import androidx.compose.runtime.*
import com.hocliving.app.ui.theme.TealPrimary
import java.text.NumberFormat
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class, ExperimentalFoundationApi::class)
@Composable
fun DetailScreen(
    propertyId: Int,
    onBack: () -> Unit
) {
    var property by remember { mutableStateOf<Property?>(null) }
    var loading by remember { mutableStateOf(true) }

    LaunchedEffect(propertyId) {
        loading = true
        // Search offline sample first, then try Germany cache (most common)
        property = SampleData.properties.find { it.id == propertyId }
        if (property == null) {
            try {
                val list = ListingsRepository.loadCountry("Germany")
                property = list.find { it.id == propertyId }
            } catch (_: Exception) { }
        }
        loading = false
    }

    if (loading) {
        Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            CircularProgressIndicator(color = TealPrimary)
        }
        return
    }

    if (property == null) {
        Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text("Property not found")
        }
        return
    }
    val property = property!!

    val priceFormatted = NumberFormat.getCurrencyInstance(Locale("en", "PT")).apply {
        maximumFractionDigits = 0
    }.format(property.price)

    val pagerState = rememberPagerState(pageCount = { property.images.size })

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(property.title, maxLines = 1) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        },
        bottomBar = {
            Surface(shadowElevation = 8.dp) {
                Row(
                    Modifier.fillMaxWidth().padding(16.dp),
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(Modifier.weight(1f)) {
                        Text(
                            priceFormatted + if (property.type == "rent") "/mo" else "",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = TealPrimary
                        )
                        Text(
                            if (property.type == "rent") "Available for rent" else "Available for sale",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    Button(
                        onClick = { },
                        colors = ButtonDefaults.buttonColors(containerColor = TealPrimary),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text("Request a tour")
                    }
                }
            }
        }
    ) { padding ->
        LazyColumn(Modifier.fillMaxSize().padding(padding)) {
            item {
                Box {
                    HorizontalPager(state = pagerState, modifier = Modifier.fillMaxWidth().height(280.dp)) { page ->
                        AsyncImage(
                            model = property.images[page],
                            contentDescription = null,
                            contentScale = ContentScale.Crop,
                            modifier = Modifier.fillMaxSize()
                        )
                    }
                    Row(
                        Modifier.align(Alignment.BottomCenter).padding(12.dp),
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        repeat(property.images.size) { i ->
                            Box(
                                Modifier
                                    .size(if (i == pagerState.currentPage) 8.dp else 6.dp)
                                    .clip(CircleShape)
                                    .background(if (i == pagerState.currentPage) Color.White else Color.White.copy(alpha = 0.5f))
                            )
                        }
                    }
                }
            }
            item {
                Column(Modifier.padding(16.dp)) {
                    Surface(
                        color = if (property.type == "rent") Color(0xFF0369A1) else TealPrimary,
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(
                            if (property.type == "rent") "FOR RENT" else "FOR SALE",
                            color = Color.White,
                            style = MaterialTheme.typography.labelLarge,
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                        )
                    }
                    Spacer(Modifier.height(8.dp))
                    Text(property.title, style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
                    Spacer(Modifier.height(4.dp))
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Outlined.LocationOn, null, tint = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.size(18.dp))
                        Spacer(Modifier.width(4.dp))
                        Text("${property.address}, ${property.city}", style = MaterialTheme.typography.bodyLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }
            item {
                Row(Modifier.fillMaxWidth().padding(horizontal = 16.dp), horizontalArrangement = Arrangement.SpaceEvenly) {
                    SpecItem(Icons.Outlined.Bed, "${property.bedroom}", "Beds")
                    SpecItem(Icons.Outlined.Bathtub, "${property.bathroom}", "Baths")
                    SpecItem(Icons.Outlined.SquareFoot, "${property.postDetail.size}", "Sqft")
                    SpecItem(Icons.Outlined.Home, property.property.replaceFirstChar { it.uppercase() }, "Type")
                }
            }
            item { HorizontalDivider(Modifier.padding(16.dp)) }
            item {
                Column(Modifier.padding(horizontal = 16.dp)) {
                    Text("Description", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(8.dp))
                    Text(property.postDetail.desc, style = MaterialTheme.typography.bodyLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
            item {
                Spacer(Modifier.height(16.dp))
                Column(Modifier.padding(horizontal = 16.dp)) {
                    Text("Details", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(8.dp))
                    DetailRow("Utilities", property.postDetail.utilities)
                    DetailRow("Pet policy", property.postDetail.pet)
                    DetailRow("Income / financing", property.postDetail.income)
                }
            }
            item { Spacer(Modifier.height(24.dp)) }
        }
    }
}

@Composable
private fun SpecItem(icon: ImageVector, value: String, label: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Icon(icon, null, tint = TealPrimary)
        Spacer(Modifier.height(4.dp))
        Text(value, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
        Text(label, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Composable
private fun DetailRow(label: String, value: String) {
    Row(Modifier.fillMaxWidth().padding(vertical = 6.dp), horizontalArrangement = Arrangement.SpaceBetween) {
        Text(label, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Text(value, style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Medium, modifier = Modifier.weight(1f, fill = false).padding(start = 16.dp))
    }
}
