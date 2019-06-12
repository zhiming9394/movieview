<!--suppress ALL -->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import {} from "./api";
export default {
  name: 'app',

  created: function() {
      // let token = window.localStorage["token"];
      // getTokenData(token).then(
      //     (res)=>{
      //     let data = res.data.user;
      //     this.$store.commit('setUser', data)
      // },(res)=>{
          
      // })
    },
}
</script>

<style>
 html,body,#app {
  height: 100%;
  margin: 0px;
}
</style>
