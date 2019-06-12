<template>
  <div class="wrapper">
      <el-row>
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
        <h1>选电影</h1>
        <div class="tage">
            <div class="tag-list">
                <el-button type="text" v-for="item in Categorylist" :key="item._id" @click="chooseType(item.name)">{{item.name}}</el-button>
            </div>
        </div>
        <div class="movie-list">
        <div
          class="moive-card"
          v-for="item in tuijiandata"
          :key="item._id"
        >
          <img :src="item.videoKey" @click="pushMovieVx(item._id)" class="moive-card-img">
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
        </div>
      </el-col>
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
      </el-row>
  </div>
</template>

<script>
import { getTypeMovies, getCategorylists } from "../api";
export default {
  components:{},
  props:{},
  data(){
    return {
        Categorylist:[],
        tuijiandata:[]
    }
  },
  watch:{},
  computed:{},
  methods:{
      chooseType(type) {
        getTypeMovies(type).then(res =>{
        let movies1 = res.data.movies[0].CategoryArry
        let movies2 = movies1.filter(item => { if(item.videoKey){
          item.videoKey ="http://ppfaom9b2.bkt.clouddn.com/" + item.videoKey;
          return  item}
          })
        this.tuijiandata = movies2

          })
      },

      pushMovieVx(id) {
      this.$store.dispatch("GetDetailMoive", id).then(()=>{this.$router.push({path: `/movieDetail`})});
    },
  },
  created(){
      getCategorylists().then(res=>{
          console.log(res)
          let Categorylist = res.data.Categorylist
          this.Categorylist = Categorylist
          this.chooseType(Categorylist[0].name)
      })

  },
}
</script>
<style lang="scss" scoped>
.wrapper{}

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
    width: 25%;
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
</style>