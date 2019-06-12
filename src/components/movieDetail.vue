<template>
  <div>
      <el-row>
        <el-col :xs="0" :sm="1" :md="3" :lg="3" :xl="3">&nbsp;</el-col>
        <el-col :xs="24" :sm="17" :md="13" :lg="15" :xl="13">
          <div class="title">{{moivedata.title}}  ({{moivedata.year}})</div>
          <div class="movie-detial-card">
            <div>
              <img :src="moivedata.videoKey" alt="正在加载" class="moive-post">
              <div class="good_like">
                <h1>豆瓣评分</h1>
                <el-rate
                  style="float:right"
                  v-model="moivedata.rate"
                  disabled
                  show-score
                  text-color="#ff9900"
                ></el-rate>
              </div>
            </div>
            <div class="data-area">
              <div>
                <span class="span-title">演员:</span>
                <span class="content">{{moivedata.actor}}</span>
              </div>
              <div>
                <span class="span-title">电影类型:</span>
                <span v-for="(item,index) in moivedata.movie_type" :key="index" class="content">{{item}}   </span>
              </div>
              <div>
                <span class="span-title">简介:</span>
                <span class="content">{{moivedata.summary}}</span>
              </div>
            </div>
          </div>

          <div class="title">热门评论<a @click="showComment_card()"><i class="el-icon-edit-outline" style='font-size:20px'></i>  我也要写评论！</a></div>
          <transition name="el-zoom-in-top">
          <div class="comment-card" v-if="comment">
              <div class="comment-head">添加收藏：写短评</div>
              <span style="padding:30px;">简短评论：</span>
            <div class="comment-input-area">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="comment_content"
              class="comment-input"
            ></el-input>
            </div>
            <div>
              <el-button
                type="primary"
                class="comment-button"
                style="margin-left:42%;"
                @click="uploadComment()"
              >保存</el-button>
              <el-button
                type="primary"
                  class="comment-button"
                @click="showComment_card()"
              >取消</el-button>
            </div>
          </div>
           </transition>
          <div
            class="pinglun-card"
            v-for="(item, index) in commentContent_card"
            :key="index"
          >
            <el-button type='text' class="pinglun-mingcheng" @click="lookUser(item.username)" >{{item.username}}</el-button>
            <span class="pinglun-time">发布于  {{item.meta.createdAt}}</span>
            <el-button type="text" class="pinglun-dianzan" @click="dianzan(item)">赞 {{item.like}}</el-button>
            <div class="pinglun-content">{{item.content}}</div>
          </div>
        </el-col>
        <el-col :xs="0" :sm="2" :md="3" :lg="2" :xl="3">&nbsp;</el-col>
        <el-col :xs="0" :sm="4" :md="5" :lg="4" :xl="5">
          <div class="title">同类电影推荐</div>
          <div class="moive-card" v-for="item in tuijiandata" :key="item._id">
            <router-link
              :to="{ path:'/movieDetail' , query:{id:item.id}}"
              @click.native="pushMovieVx(item)"
            >
              <img :src="item.videoKey" class="moive-card-img">
            </router-link>
            <div class="moive-card-msg">
              <div>
                <p>{{item.title}}</p>
              </div>
              <div>
                <span class="moive-card-date">{{item.year}}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { getRefMovie,addComment,getCommentByMid,addInterest,uploadlike} from "../api";
import { getNewDate } from "../../public/js/getDate";
export default {
  name: "movieDeatail",
  created() {
    this.moivedata = this.$store.state.detailmovie.data

    getCommentByMid(this.$store.state.detailmovie.data.doubanId).then((res)=>{
      this.commentContent_card = res.data.comments[0].commentsArry
    })
    getRefMovie(this.moivedata.movie_type).then(res => {
      let movies = res.data.movies;

      for (let i = 0; i < movies.length; i++) {
        movies[i].videoKey =
          "http://ppfaom9b2.bkt.clouddn.com/" + movies[i].videoKey;
        if(!movies[i].meta.createdAt){
          movies[i].meta.createdAt == ""
        }
        this.tuijiandata.push(movies[i]);
      }
    });

    setInterval(this.timerupdategoodlike, 500000);
  },

  beforeDestroy() {
    this.timerupdategoodlike();
  },

  computed: {
    moviedetail() {
      return this.$store.state.detailmovie;
    }
  },

  data() {
    return {
      moivedata: {},
      
      following:[],

      tuijiandata: [],

      comment: false,

      commentContent_card: [],

      comment_content: "",

      likeArr:[],

      personMsg: {}
    };
  },

  methods: {
    showComment_card() {
      this._data.comment = !this._data.comment;
    },
    uploadComment() {
      if(!this.$store.state.user.personMsg.username){
        this.$message({
            message: "请用户先登录",
          });
          return
      }
      let commentContentItem = {
        moive_id: this.moivedata.doubanId,
        title: this._data.moivedata.title,
        username: this.$store.state.user.personMsg.username,
        content: this._data.comment_content,
        meta: {
          createdAt:getNewDate(),
          updatedAt:getNewDate()
        },
        like: 0
    }
      addComment(commentContentItem).then(res => {
        if ((res.data.msg = "ok")) {
          this.$message({
            message: "评论成功",
            type: "success"
          });
          this._data.comment = !this._data.comment;
          this._data.commentContent_card.push(commentContentItem);
        }
      });
    },

    like(data){
            let tigger = 1
            this.likeArr.forEach((element,index) => {
                if(element._id == data._id){
                    this.likeArr.splice(index,1) 
                    data.like = data.like-1
                    tigger = -1
                }
            })
            if(tigger == 1){
            data.like = data.like+1
            this.likeArr.push(data);
          }
          return tigger
      },
    dianzan(item) {
      const res = this.like(item)
    },

    lookUser(username){
       this.$router.push({path: `/infoOfuser`,query:{username:username}})
    },

    timerupdategoodlike(){
      uploadlike(this.likeArr).then(res=>{
        console.log(res)
        this.likeArr = []
      })
    }

  }
};
</script>

<style scoped>
.container {
  font-size: 17px;
}

.title {
  font-size: 22px;
  font-weight: 700;
  margin: 10px 0;
  text-align: left;
}

.title a{
    padding-right:2%; 
    float:right;
}

.moive-post {
  float: left;
  width: 170px;
  height: 250px;
}

.span-title{
  color: #666699;
}

.data-area {
  float: left;
}
.data-area div{
  padding-top: 10px;
}

.good_like h1{
  font-size: 22px;
  font-weight: 700;
  margin: 10px 0;
  text-align: right;
  color:#007722;
}

.content {
  text-align: left;
}

.movie-detial-card{
    display: block;
    overflow:hidden;
}

.pinglun-card {
  width: 80%;
  font-size: 13px;
  padding: 14px 0;
  border-bottom: 1px  solid #dddddd;
}

.pinglun-touxiang {
  text-align: left;
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
}

.comment-card {
  border: 1px solid #dddddd;
  margin: 10px 0px;
  min-height: 130px;
  border-radius: 4px 4px 4px 4px;
}
.comment-head {
    padding: 12px 0;
    width: 100%;
    clear: both;
    background: #ebf5ea;
    overflow: hidden;
    font: 15px Arial, Helvetica, sans-serif;
    color: #072;
    text-align: center;
}

.comment-input-area{
    position: relative;
    margin: 15px 15px 0 15px;
    height: 65px;
    zoom: 1;
}

.comment-input {
  width: 100%;
  text-align: center;
  margin-top: 5px;
  height: 50%;
  position: absolute;
  z-index: 9;
}

.comment-button{
    margin: 5px;
    text-align:center;
}

.moive-card {
  float: left;
  width: 60%;
  min-width: 100px;
  margin-right: 1%;
  margin-bottom: 1%;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.35);
}

.moive-card-img {
  display: block;
  width: 100%;
}

.moive-card-msg {
  padding: 10px 1em;
  background: #ededf1;
  font-size: 1.3em !important;
  color: #0c0d0d;
  overflow: hidden;
}

.moive-card-msg p {
  margin: 0px;
}

.moive-card-like {
  display: block;
  font-size: 13px;
}

.moive-card-date {
  display: block;
  font-size: 1em;
  color: #333;
  line-height: 22px;
}
</style>