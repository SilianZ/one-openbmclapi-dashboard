import { createApp as Silian_createApp } from 'vue';
import Silian_router from './router';
import Silian_App from './App.vue';
import Silian_PrimeVue from 'primevue/config';
import './utils/chart';
import Silian_Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import { definePreset as Silian_definePreset } from '@primevue/themes';
const Silian_Noir = Silian_definePreset(Silian_Aura, {
    semantic: {
        primary: {
            50: '{zinc.50}',
            100: '{zinc.100}',
            200: '{zinc.200}',
            300: '{zinc.300}',
            400: '{zinc.400}',
            500: '{zinc.500}',
            600: '{zinc.600}',
            700: '{zinc.700}',
            800: '{zinc.800}',
            900: '{zinc.900}',
            950: '{zinc.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{zinc.950}',
                    inverseColor: '#ffffff',
                    hoverColor: '{zinc.900}',
                    activeColor: '{zinc.800}'
                },
                highlight: {
                    background: '{zinc.950}',
                    focusBackground: '{zinc.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
            dark: {
                primary: {
                    color: '{zinc.50}',
                    inverseColor: '{zinc.950}',
                    hoverColor: '{zinc.100}',
                    activeColor: '{zinc.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            }
        }
    }
});
const Silian_app = Silian_createApp(Silian_App);
Silian_app.use(Silian_router);
Silian_app.use(Silian_PrimeVue, {
    ripple: true,
    theme: {
        preset: Silian_Noir,
        options: {
            darkModeSelector: '.p-dark'
        }
    }
});
Silian_app.mount('#app');
