package com.hocliving.app.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.hocliving.app.ui.screens.DetailScreen
import com.hocliving.app.ui.screens.HomeScreen
import com.hocliving.app.ui.screens.ListingsScreen
import java.net.URLDecoder
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

sealed class Screen(val route: String) {
    data object Home : Screen("home")
    data object Listings : Screen("listings?country={country}&q={q}") {
        fun create(country: String = "Germany", q: String = ""): String {
            val c = URLEncoder.encode(country, StandardCharsets.UTF_8.toString())
            val query = URLEncoder.encode(q, StandardCharsets.UTF_8.toString())
            return "listings?country=$c&q=$query"
        }
    }
    data object Detail : Screen("detail/{id}") {
        fun createRoute(id: Int) = "detail/$id"
    }
}

@Composable
fun AppNavHost() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = Screen.Home.route) {
        composable(Screen.Home.route) {
            HomeScreen(
                onBrowseListings = { country, q ->
                    navController.navigate(Screen.Listings.create(country, q))
                },
                onPropertyClick = { id -> navController.navigate(Screen.Detail.createRoute(id)) }
            )
        }
        composable(
            route = "listings?country={country}&q={q}",
            arguments = listOf(
                navArgument("country") { type = NavType.StringType; defaultValue = "Germany" },
                navArgument("q") { type = NavType.StringType; defaultValue = "" }
            )
        ) { entry ->
            val country = URLDecoder.decode(
                entry.arguments?.getString("country") ?: "Germany",
                StandardCharsets.UTF_8.toString()
            )
            val q = URLDecoder.decode(
                entry.arguments?.getString("q") ?: "",
                StandardCharsets.UTF_8.toString()
            )
            ListingsScreen(
                initialCountry = country,
                initialQuery = q,
                onBack = { navController.popBackStack() },
                onPropertyClick = { id -> navController.navigate(Screen.Detail.createRoute(id)) }
            )
        }
        composable(
            route = Screen.Detail.route,
            arguments = listOf(navArgument("id") { type = NavType.IntType })
        ) { backStackEntry ->
            val id = backStackEntry.arguments?.getInt("id") ?: 0
            DetailScreen(propertyId = id, onBack = { navController.popBackStack() })
        }
    }
}
