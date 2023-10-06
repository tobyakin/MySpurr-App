import './assets/main.css'

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

const app = createApp(App)
app.component('vue-select', VueNextSelect)
app.component('multi-select', Multiselect)
app.use(Toast, { position: POSITION.TOP_RIGHT});

app.use(createPinia())
app.use(router)
app.use(Antd);

app.mount('#app')
