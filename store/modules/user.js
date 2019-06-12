import Vuex from 'vuex';
import Vue from 'vue';
const {login} =require('../../src/api')


Vue.use(Vuex);

const state = {
        personMsg:JSON.parse(localStorage.getItem("personMsg")),
        token:localStorage.getItem("token")
    }
const mutations = {
        setUser(state,data){
            let personMsg = JSON.stringify(data)
            localStorage.setItem("personMsg", personMsg)
            state.personMsg= data
        },
        setToken(state,data){
            localStorage.setItem("token", data)
            state.token = data
        },
        deleteUserinfo(state){
            state.personMsg="";
            state.token = ""
        },
        addfollow(state,data){
            state.personMsg.follow.push(data)
        },
    }
const actions = {
    Login({commit}, userInfo){
        const username = userInfo.username.trim()
        const password = userInfo.password.trim()
        return new Promise((resolve, reject) => {
            login(username,password).then( res=>{
                if(res.data.success == false){
                   return reject(res.data.error)
                }
                console.log(res)
                commit('setToken', res.data.token)
                let personMsg = res.data.data
                commit('setUser', personMsg)
                
                resolve()
            }
            ).catch(error =>{
                reject(error)
            })
        })
    },

    Logout({commit}){
        window.localStorage.clear();
        commit('deleteUserinfo')
    }
}



export default {
    state,
    mutations,
    actions,
  }

