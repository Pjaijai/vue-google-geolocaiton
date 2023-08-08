import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import './index.css'
const app = createApp(App)

app
  .use(VueGoogleMaps, {
    load: {
      key: `${import.meta.env.VITE_GOOGLE_API_KEY}`,
      libraries: 'places'
    },
    autobindAllEvents: true
  })
  .use(router)
  .mount('#app')
