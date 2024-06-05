import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueCookies from 'vue-cookies';
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'

import DesktopLeftNav from './components/sections/desktop/LeftNav.vue';
import DesktopRightNav from './components/sections/desktop/RightNav.vue';
import PostFeed from './components/core_components/PostFeed.vue';
import MobileBottomNav from './components/sections/mobile/BottomNav.vue';
import BurgerMenu from './components/sections/mobile/BurgerMenu.vue';

const app = createApp(App)

app.component('DesktopLeftNav', DesktopLeftNav)
app.component('DesktopRightNav', DesktopRightNav)
app.component('PostFeed', PostFeed)
app.component('MobileBottomNav', MobileBottomNav)
app.component('BurgerMenu', BurgerMenu)


app.use(bootstrap);

app.use(store)

app.use(VueCookies)

app.use(router)

app.mount('#app')
