import Vuex from 'vuex';
import Vue from 'vue';
const {getDetailMoive} =require('../../src/api')


Vue.use(Vuex);



const state = {
        data : JSON.parse(sessionStorage.getItem('moviedetail'))
    }
const mutations = {
        setmoviedetail(state,data){
            let dataJson = JSON.stringify(data)
            sessionStorage.setItem('moviedetail',dataJson);
            state.data = data;
        }
    }
const  actions = {
    GetDetailMoive({commit}, id){
        sessionStorage.clear()
        return new Promise((resolve, reject) => {
            getDetailMoive(id).then( res=>{
                let data = res.data.movies
                data.videoKey = "http://ppfaom9b2.bkt.clouddn.com/" + data.videoKey
                commit('setmoviedetail', data)
                resolve()
            }
            ).catch(error =>{
                reject(error)
            })
        })
    }
    
}



export default {
    state,
    mutations,
    actions,
  }