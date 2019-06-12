import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import detailmovie from './modules/detailmovie'

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        user,
        detailmovie
    }
});