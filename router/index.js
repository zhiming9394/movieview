/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'

import index from '../src/page/index.vue'
import login from '../src/page/login.vue'
import register from '../src/page/register.vue'
import upLoadMoive from '../src/components/uploadmoive.vue'
import userContent from '../src/components/userContent'
import indexCompents from '../src/components/indexCompents'
import movieDetail from '../src/components/movieDetail'
import chooseMoive from '../src/components/chooseMoive'
import commentsList from '../src/components/commentsList'
import myinfo from '../src/components/myinfo'
import infoOfuser from '../src/components/infoOfuser'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/index',
            component: index,
            children: [
                { path: '/userContent/upLoadMoive',
                  component: userContent,
                  redirect: '/upLoadMoive',
                   children: [
                       {path: '/upLoadMoive', component: upLoadMoive},
                    ],
                },
                { path: '/userContent/myinfo',
                  component: userContent,
                  redirect: '/myinfo',
                   children: [
                       {path: '/myinfo', component: myinfo},
                    ],
                },
                { 
                    path: '/indexCompents',
                    name:"indexCompents",
                    component: indexCompents,
                },
                { 
                    path: '/movieDetail',
                    name:"movieDetail",
                    component: movieDetail,
                    meta:{
                        keepAlive:true
                    }
                },
                { 
                    path: '/infoOfuser',
                    name:"infoOfuser",
                    query:{},
                    component: infoOfuser,
                },
                { path: '/chooseMoive',
                    component: chooseMoive,
                },
                { 
                    path: '/commentsList',
                    name:"commentsList",
                    component: commentsList,
                },
            ],

        },
        {
            path: '/',
            redirect: '/indexCompents'
        },

        {
            path: '/login',
            component: login,
        },

        {
            path: '/register',
            component: register,
        }
        ]
})