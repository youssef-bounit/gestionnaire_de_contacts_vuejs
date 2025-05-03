<template>
    <div>
        <!-- App Bar -->
        <v-app-bar app color="deep-purple-accent-4" dark prominent>
            <!-- Hamburger Menu Icon (visible on small screens) -->
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-lg-none"></v-app-bar-nav-icon>

            <v-toolbar-title>Responsive App</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- Navigation Links (visible on large screens) -->
            <div class="d-none d-lg-flex">
                <v-btn text to="/">Home</v-btn>
                <v-btn text to="/features">Features</v-btn>
                <v-btn text to="/pricing">Pricing</v-btn>
                <v-btn text to="/docs">Docs</v-btn>
            </div>

            <v-btn icon class="ml-2">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- Navigation Drawer (for mobile/small screens) -->
        <v-navigation-drawer v-model="drawer" app temporary>
            <v-list nav density="compact">
                <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/"></v-list-item>
                <v-list-item prepend-icon="mdi-star" title="Features" value="features" to="/features"></v-list-item>
                <v-list-item prepend-icon="mdi-currency-usd" title="Pricing" value="pricing"
                    to="/pricing"></v-list-item>
                <v-list-item prepend-icon="mdi-file-document-outline" title="Docs" value="docs"
                    to="/docs"></v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false) // State to control the drawer visibility
</script>

<style scoped>
/* Add styles if needed */
.v-btn {
    margin: 0 4px;
}
</style>
