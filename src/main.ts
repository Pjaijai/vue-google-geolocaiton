import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)

app
  .use(VueGoogleMaps, {
    load: {
      key: import.meta.env.VUE_APP_GOOGLE_API_KEY
    },
    autobindAllEvents: true,
    libraries: 'places'
  })
  .use(router)
  .mount('#app')
