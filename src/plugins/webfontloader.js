import WebFontLoader from 'webfontloader'

export function loadFonts() {
    WebFontLoader.load({
        // Configuration for loading fonts from Google Fonts
        google: {
            /**
             * familles: Font families to load.
             * Format: FontName:variants&display=swap
             * 'Roboto:100,300,400,500,700,900' requests Roboto font with specified weights.
             * '&display=swap' improves font loading performance/experience.
             * You can add more Google fonts here if needed.
             */
            families: [
                'Roboto:100,300,400,500,700,900&display=swap', // Default Vuetify font
                // 'Material+Icons', // Example if you wanted Google's Material Icons font
            ],
        },

        /**
         * Optional: Configuration for loading custom fonts (e.g., locally hosted or other providers).
         * This is less common now for MDI icons, as importing the CSS directly
         * (import '@mdi/font/css/materialdesignicons.css') in main.js/ts is often preferred.
         * However, you *could* configure webfontloader to load the MDI CSS if desired,
         * or track the loading status of fonts defined by already-loaded CSS.
         */
        // custom: {
        //   families: [
        //     'Material Design Icons', // The font-family name as defined in the MDI CSS
        //     // 'Your Custom Font Name'
        //   ],
        //   // urls: ['/path/to/your/custom/font.css'] // Optional: If webfontloader should load the CSS
        // },

        /**
         * Optional: Callbacks for font loading events.
         * 'active' is called when all fonts have been rendered.
         * 'inactive' is called if fonts fail to load or time out.
         * These add 'wf-active' or 'wf-inactive' classes to the <html> element,
         * which can be useful for preventing FOUT/FOIT (Flash of Unstyled/Invisible Text).
         */
        // active: () => {
        //   console.log('Fonts loaded successfully!')
        // },
        // inactive: () => {
        //   console.error('Fonts failed to load.')
        // }
    })
}