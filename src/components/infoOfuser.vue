<template>
  <div class="wrapper">
    <el-col :xs="0" :sm="1" :md="3" :lg="3" :xl="3">&nbsp;</el-col>
    <el-col :xs="24" :sm="22" :md="18" :lg="18" :xl="18">
      <div class="info-card">
        <span>昵称:</span>
        <span>{{userinfo.username}}</span>
        <el-button  type="text" style="margin-left:50px" v-if="following" >已关注</el-button>
        <el-button  type="text" style="margin-left:50px" v-else @click="addInterests(userinfo.username)">关注</el-button>
      </div>
      <div class="info-card">
        <span>用户关注:</span>
        <span>{{followLength}}</span>
      </div>
      <div class="info-card">
        <!-- <span>权限:</span><span v-if="myinfo.role==1">用户</span><span v-else>管理员</span> -->
      </div>
      <div class="info-card">
        <span>我的评论:</span>
        <span>{{DiaryArryLength}}条</span>
      </div>

      <div>
        <h1>用户评论</h1>
        <div class="pinglun-card" v-for="(item, index) in comments" :key="index">
          <span class="pinglun-mingcheng">{{item.username}}</span>
          <span class="pinglun-time">发布于{{item.meta.createdAt}}</span>
          <a class="pinglun-dianzan">共有{{item.like}}赞了</a>
          <div class="pinglun-content">{{item.content}}</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="0" :sm="1" :md="3" :lg="3" :xl="3">&nbsp;</el-col>
  </div>
</template>

<script>
import { userDiary,addInterest} from "../api";
export default {
  components: {},
  props: {},
  data() {
    return {
      userinfo: {},
      comments:{},
      following:false,
      DiaryArryLength:"",
      followLength:"",
    };
  },
  watch: {},
  computed: {},
  methods: {
    addInterests(Iusername){
    let username = this.$store.state.user.personMsg.username

      addInterest(username,Iusername).then(res =>{
        this.following =  true
        this.$store.commit('addfollow',Iusername)
      })
      
    }
  },
  created() {
    userDiary(this.$route.query.username).then(res => {
      console.log(res);
      this.userinfo = res.data.comments[0]
      this.comments = res.data.comments[0].DiaryArry
      this.DiaryArryLength = res.data.comments[0].DiaryArry.length
      this.followLength = res.data.comments[0].follow.length
      if(this.$store.state.user.personMsg.follow.indexOf(this.userinfo.username) === 1){
        this.following = true 
      }
    });
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.info-card{
  margin-left: 100px;
  padding: 20px 0px;
}
.pinglun-card {
  width: 80%;
  font-size: 13px;
  padding: 14px 0;
  border-bottom: 1px solid #dddddd;
}

.pinglun-mingcheng {
  margin-left: 10px;
  text-align: left;
}

.pinglun-time {
  font-size: 14px;
  margin-left: 10px;
  margin-right: 200px;
  color: #3f3c3c;
}
.pinglun-dianzan {
  text-align: right;
  color: #37a;
  text-decoration: none;
}

.pinglun-content {
  line-height: 1.5;
  color: #494949;
  word-wrap: break-word;
  margin: 10px;
  text-align: left;
  padding: 3px 3px;
  background: #f5f5f5
}
.sidebar-img{
  width: 100%;
  height: auto;
  padding-top: 20px;
}
</style>