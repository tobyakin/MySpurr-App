import './assets/main.css'
import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueNextSelect from 'vue-next-select'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'vue-multiselect/dist/vue-multiselect.css'
import App from './App.vue'
import router from './router'
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/reset.css'
import Multiselect from 'vue-multiselect'
import { VueQueryPlugin } from 'vue-query'
import ShortLoader from '@/components/ui/Loader/ShortLoader.vue'
import VueApexCharts from 'vue3-apexcharts'
import Label from '@/components/ui/Form/Input/Label.vue'
import DashboardLayout from '@/components/layout/dashboardLayout.vue'
import PrimeVue from 'primevue/config'
// import 'primevue/resources/themes/aura-light-green/theme.css'
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';

import Galleria from 'primevue/galleria'

import Carousel from 'primevue/carousel'
import { createHead } from '@vueuse/head';

import {
  LRectangle,
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LGeoJson
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'


const app = createApp(App)
const head = createHead();
app.use(VueTelInput)

app.component('Galleria', Galleria)
app.component('Carousel', Carousel)
app.component('ApexChart', VueApexCharts)
app.component('Label', Label)
app.component('DashboardLayout', DashboardLayout)
app.component('ShortLoader', ShortLoader)
app.component('vue-select', VueNextSelect)
app.component('multi-select', Multiselect)
app.component('l-rectangle', LRectangle)
app.component('l-map', LMap)
app.component('l-icon', LIcon)
app.component('l-tile-layer', LTileLayer)
app.component('l-marker', LMarker)
app.component('l-control-layers', LControlLayers)
app.component('l-tooltip', LTooltip)
app.component('l-popup', LPopup)
app.component('l-polyline', LPolyline)
app.component('l-polygon', LPolygon)
app.component('l-geo-json', LGeoJson),
app.use(Toast, { position: POSITION.TOP_RIGHT })
app.use(VueQueryPlugin)
app.use(PrimeVue)
app.use(CkeditorPlugin)

app.use(createPinia())
app.use(router)
app.use(Antd);
app.use(head);

app.mount('#app')
document.title = 'MySpurr | Creative talent hiring'
