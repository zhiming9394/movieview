<template>
  <div class="wrapper">
    <div class="info-card">
      <span>我的昵称:</span><span>{{myinfo.username}}</span><el-button  type="text" @click="delCount()" class="zhuxiao">注销账户</el-button>
    </div>
    <div class="info-card">
      <span>我的关注:</span><span>{{myinfo.username}}</span>
    </div>
    <div class="info-card">
      <span>权限:</span><span v-if="myinfo.role==1">用户</span><span v-else>管理员</span>
    </div>
    <div class="info-card">
      <span>我的评论:</span><span>{{myinfo.diary.length}}条</span>
    </div>
      
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      myinfo:{}
    }
  },
  watch:{},
  computed:{},
  methods:{
    delCount() {
      this.$store.dispatch('Logout').then(
        (res) => {this.$router.push({path: `/indexCompents`})})
    }
  },
  created(){
    this.myinfo = this.$store.state.user.personMsg
  },
  mounted(){
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
    margin: 0 auto;
}
.info-card{
  margin-left: 100px;
  padding: 20px 0px;
}
</style>