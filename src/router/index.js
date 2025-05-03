import { createRouter, createWebHistory } from 'vue-router'

// Auto import all .vue files under pages (recursively)
const pages = import.meta.glob('../pages/**/*.vue')

// Example global guard function
const globalBeforeEnter = (to, from, next) => {
    // Example logic — customize this!
    console.log(`Navigating to ${to.fullPath} from ${from.fullPath}`)
    next() // allow the navigation
}

const routes = Object.keys(pages).map((filePath) => {
    // Remove ../pages and .vue
    let path = filePath.replace('../pages', '').replace(/\.vue$/, '')

    // Normalize index files (case-insensitive)
    path = path.replace(/\/(index|Index)$/, '/')

    // Ensure path starts with /
    if (!path.startsWith('/')) {
        path = '/' + path
    }

    // Convert dynamic route files like [id].vue -> :id
    path = path.replace(/\[([^\]]+)\]/g, ':$1')

    // Optional: lowercase route path if desired (except dynamic params)
    path = path
        .split('/')
        .map((segment) => (segment.startsWith(':') ? segment : segment.toLowerCase()))
        .join('/')

    // Handle Home.vue or home.vue as root
    if (path === '/home') path = '/'

    return {
        path,
        component: pages[filePath],
        name: path === '/' ? 'home' : path.replace(/\//g, '-').replace(/^-|-$/g, ''),
        beforeEnter: globalBeforeEnter, // <-- Add your global route guard here
    }
})

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
