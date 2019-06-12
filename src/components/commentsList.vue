<template>
  <div class="wrapper">
    <el-row>
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
      <el-col :xs="24" :sm="21" :md="19" :lg="14" :xl="12">
        <h1>影评世界</h1>
        <div class="tage">
          <div class="tag-list">
            <el-button
              type="text"
              v-for="item in Categorylist"
              :key="item"
              @click="chooseType(item)"
            >{{item}}</el-button>
          </div>
        </div>
        <div class="pinglun-card" v-for="(item, index) in comments" :key="index">
          <span class="pinglun-mingcheng">{{item.username}}</span>
          <span class="pinglun-time">发布于{{item.meta.createdAt}}</span>
          <a class="pinglun-dianzan">共有{{item.like}}赞了你</a>
          <div class="pinglun-content">{{item.content}}</div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="1" :md="2" :lg="6" :xl="6">
        <div>
          <img :src="img.videoKey" class="sidebar-img">
        </div>
        <h1>如果你觉得一篇评论对你有帮助，请你点击“赞”。你的投票直接决定哪些评论出现在首页和“评论世界”里。</h1>
      </el-col>
      <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="2">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
import { userDiary, userFollow, gethotComments } from "../api";
export default {
  name: "commentsList",
  components: {},
  props: {},
  data() {
    return {
      Categorylist: ["我的评论", "最受欢迎评论", "我的关注"],
      comments: [],
      img: { videoKey: require("../../public/image/img9.jpg") }
    };
  },
  watch: {},
  computed: {
    personMsg() {
      return this.$store.state.user.personMsg;
    }
  },
  methods: {
    chooseType(type) {
      console.log(type)
      let username = this.$store.state.user.personMsg.username;
      if (type == "我的关注") {
        userFollow(username).then(res => {
          this.comments = res.data.comments;
        });
      }

      if (type == "我的评论") {
        let personMsg = this.$store.state.user.personMsg;
          userDiary(personMsg.username).then(res => {
          let DiaryArry = res.data.comments[0].DiaryArry;
          this.comments = DiaryArry;
        });
      }

      if (type =="最受欢迎评论") {
        gethotComments().then(res => {
          this.comments = res.data.comments;
        });
      }
    }
  },
  created() {
    if (this.$store.state.user.personMsg) {
      let personMsg = this.$store.state.user.personMsg;
      userDiary(personMsg.username).then(res => {
        let DiaryArry = res.data.comments[0].DiaryArry;
        this.comments = DiaryArry;
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
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
  background: #f5f5f5;
}
.sidebar-img {
  width: 100%;
  height: auto;
  padding-top: 20px;
}
</style>