<script setup>
import Navigation from './Layouts/Navigation.vue'
</script>

<template>
    <v-app>
        <Navigation />
        <v-main>
            <v-container fluid>
                <!-- Your application content, e.g., <router-view> -->
                <p>Main Content Area</p>
                <router-view></router-view>
                <!-- If using Vue Router -->
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped></style>
