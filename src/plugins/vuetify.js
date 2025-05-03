// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { h } from 'vue'

import { mdi } from 'vuetify/iconsets/mdi'

// Define the custom Tabler icon set component
const tablerIconComponent = {
    component: (props) =>
        h('i', { // Renders an <i> tag
            class: [
                'ti', // Base Tabler class
                `ti-${props.icon}`, // Specific Tabler icon class (e.g., ti-home)
                props.class, // Pass through any additional classes
            ],
            // You can add other attributes like 'aria-hidden': true if needed
        }),
}

export function createTablerIconSet(options) {
    return {
        component: (props) =>
            h(tablerIconComponent.component, { ...props, ...options }),
    }
}

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // Keep MDI as the default
        sets: {
            // Include the default MDI set
            mdi,
            // Define the custom 'tabler' set
            tabler: createTablerIconSet(), // Use the helper function
        },
    }
})

export default vuetify
