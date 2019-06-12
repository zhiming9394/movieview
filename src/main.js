// noinspection JSAnnotator
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import router from '../router/index.js';
import store from '../store/index.js'
import App from './App.vue';
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)


Vue.prototype.$http = axios;
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
  render: h => h(App),
}).$mount('#app');
