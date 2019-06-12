<template>
  <el-row>
    <el-col :xs="0" style="margin:1%;padding: 0 13%">
      <el-carousel indicator-position="outside" height="450px">
        <el-carousel-item v-for="item in lunbodata" :key="item.id">
          <img class="lunbo-img" :src="item.videoKey">
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <el-row>
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
      <el-col :sm="14" :md="11" :lg="11" :xl="10">
        <div
          class="moive-card"
          v-for="item in tuijiandata"
          :key="item._id"
        >
          <router-link
            :to="{ path:'/movieDetail' , query:{id:item.id}}"
            @click.native="pushMovieVx(item)"
          >
            <img :src="item.videoKey" class="moive-card-img">
          </router-link>
          <div class="moive-card-msg">
            <div class="moive-card-title">
              <p>{{item.title}}</p>
            </div>
            <div>
              <span class="moive-card-date">{{item.year}}</span>
              <div class="moive-card-like">
                <el-rate v-model="item.rate" disabled text-color="#ff9900"></el-rate>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="9" :md="8" :lg="7" :xl="6">
        <el-collapse>
          <h1>热门评论</h1>
          <el-collapse-item
            v-for="item in hotComments"
            :key="item._id"
            :title="item.username+'   '+item.moive_name+'   赞  '+item.goodlike"
          >
            <div>{{item.movie_comment}}</div>
          </el-collapse-item>
        </el-collapse>
        <el-carousel indicator-position="outside" height="500px">
          <el-carousel-item v-for="item in videoArry" :key="item.src">
             <h1 @click="PlayVideo(item.video)">精彩预告({{item.title}})</h1>
             <img :src="item.videoKey"  class="lunbo-img" @click="PlayVideo(item.video)">
          </el-carousel-item>
        </el-carousel>

        <el-dialog :visible.sync="detialPlayVideo" @close="closePlay">
          <videoPlayer :videoUrl="videoPlayer.videoUrl" :state="videoPlayer.state"></videoPlayer>
        </el-dialog>
      </el-col>
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
    </el-row>
  </el-row>
</template>

<script>
import search from "./search";
import videoPlayer from "./videoPlayer";
import { indexMoviecards, getMp4Movies } from "../api";

export default {
  name: "indexcompents",
  components: {
    search,
    videoPlayer
  },

  data() {
    return {
      detialPlayVideo: false,
      currentDate: new Date(),
      lunbodata: [
        { id: "1", videoKey: require("../../public/image/lunbo/lunbo1.jpg") },
        { id: "2", videoKey: require("../../public/image/lunbo/lunbo2.jpg") },
        { id: "3", videoKey: require("../../public/image/lunbo/lunbo3.jpg") },
        { id: "4", videoKey: require("../../public/image/lunbo/lunbo4.jpg") },
        { id: "5", videoKey: require("../../public/image/lunbo/lunbo5.jpg") }
      ],
      tuijiandata: [],
      hotComments: [],
      videoArry: [],
      videoPlayer:{
        videoUrl:"http://pplhm42r7.bkt.clouddn.com/",
        state:true
      }
    };
  },

  watch: {
    videoUrl: function(val) {
      // const myPlayer = this.$refs.videoPlayer.player
      if (val !== "") {
        this.$refs.videoPlayer.player.src(val);
      }
    },
    state: function(val) {
      if (val) {
        this.$refs.videoPlayer.player.pause();
      }
    }
  },

  created: function() {
    indexMoviecards().then(res => {
      console.log(res);
      let movies = res.data.movies;
      for (let i = 0; i < movies.length; i++) {
        movies[i].videoKey =
          "http://ppfaom9b2.bkt.clouddn.com/" + movies[i].videoKey;
        this.tuijiandata.push(movies[i]);
        let randomNum = parseInt(Math.random() * 5);
        let hotComment = {
          username: movies[i].comments[randomNum].username,
          moive_name: movies[i].title,
          goodlike: movies[i].comments[randomNum].like,
          movie_comment: movies[i].comments[randomNum].content
        };
        if (hotComment.movie_comment) {
          if (this.hotComments.length < 8) {
            this.hotComments.push(hotComment);
          }
        }
      }
    });

    getMp4Movies().then(res => {
      console.log(res);
      let moives = res.data.movies;

      moives.forEach(element => {
        element.videoKey = "http://ppfaom9b2.bkt.clouddn.com/" + element.videoKey;
        this.videoArry.push(element);
      });
    });
  },

  methods: {
    pushMovieVx(item) {
      this.$store.commit("setmoviedetail", item);
    },

    PlayVideo(url) {
      this.detialPlayVideo = true;
      this.videoPlayer.videoUrl = this.videoPlayer.videoUrl +url
    },

    closePlay(){}
  }
};
</script>

<style scoped>
img {
  vertical-align: middle;
  border: 0;
}

.lunbo-img {
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 1550px) {
  .moive-card {
    float: left;
    width: 115px;
    height: 240px;
    margin-right: 1%;
    margin-bottom: 1%;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.35);
  }

  .moive-card-img {
    display: block;
    width: 115px;
    height: 161px;
  }

  .moive-card-msg {
    padding: 5px 1em;
    background: #ededf1;
    font-size: 13px;
    text-align: center;
    color: #0c0d0d;
    overflow: hidden;
  }

  .moive-card-title {
    max-height: 2%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .moive-card-like {
    display: none;
    font-size: 3px;
  }
}

@media screen and (min-width: 1550px) {
  .moive-card {
    float: left;
    width: 30%;
    min-width: 100px;
    margin-right: 1%;
    margin-bottom: 1%;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.35);
  }

  .moive-card-img {
    display: block;
    width: 100%;
    height: 300px;
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

  .moive-card-title {
    max-height: 2%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .moive-card-like {
    display: block;
    font-size: 13px;
  }
}

.moive-card-date {
  display: block;
  font-size: 1em;
  color: #333;
  line-height: 22px;
}

.lunbo-img{
  width: 100%;
  height: 100%;
}
</style>