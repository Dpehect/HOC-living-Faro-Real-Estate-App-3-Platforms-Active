package com.hocliving.faro.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.hocliving.faro.ui.screens.DetailScreen
import com.hocliving.faro.ui.screens.HomeScreen
import com.hocliving.faro.ui.screens.ListingsScreen

sealed class Screen(val route: String) {
    data object Home : Screen("home")
    data object Listings : Screen("listings")
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
                onBrowseListings = { navController.navigate(Screen.Listings.route) },
                onPropertyClick = { id -> navController.navigate(Screen.Detail.createRoute(id)) }
            )
        }
        composable(Screen.Listings.route) {
            ListingsScreen(
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
