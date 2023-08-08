import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {
  faUserSecret,
  faTrashCan,
  faChevronRight,
  faChevronLeft,
  faMapLocationDot
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faTrashCan, faChevronRight, faChevronLeft, faMapLocationDot)

const app = createApp(App)

app
  .use(VueGoogleMaps, {
    load: {
      key: `${import.meta.env.VITE_GOOGLE_API_KEY}`,
      libraries: 'places'
    },
    autobindAllEvents: true
  })
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app')
