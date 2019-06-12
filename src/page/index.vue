<!--suppress ALL -->
<template>
  <div>
    <el-row style="border-bottom: solid 1px #e6e6e6;">
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
      <el-col :xs="0" :sm="22" :md="20" :lg="18" :xl="16">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">
            <router-link to="/indexCompents">首页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/chooseMoive">选电影</router-link>
          </el-menu-item>
          <el-menu-item index="3">排行榜</el-menu-item>
          <el-menu-item index="4">
            <router-link to="/commentsList">影评</router-link>
          </el-menu-item>
          <router-link to="/userContent/upLoadMoive">
            <el-menu-item index="7" class="right-item">上传</el-menu-item>
          </router-link>

          <router-link to="/register" v-if="!personMsg">
            <el-menu-item index="5" class="right-item">注册</el-menu-item>
          </router-link>
          <router-link to="/userContent/upLoadMoive" v-else>
            <el-menu-item index="5" class="right-item">动态</el-menu-item>
          </router-link>
          <router-link to="/login" v-if="!personMsg">
            <el-menu-item index="6" class="right-item">登录</el-menu-item>
          </router-link>
          <router-link to="/userContent/myinfo" v-else>
            <el-menu-item index="6" class="right-item">{{personMsg.username}}</el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
      <el-col :xs="24" :sm="0" class="menu-sm">
        <i class="el-icon-menu" style="font-size:35px; padding-right:10px"></i>
        <i class="el-icon-search" style="font-size:35px; padding-right:20px"></i>
      </el-col>
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
    </el-row>
    <el-row>
      <el-col>
        <router-view/>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="bottom">
        <h2>大学生毕业作品  在此鸣谢豆瓣网站为我提供的电影素材</h2>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTokenData } from "../api";

export default {
  name: "index",
  created: function() {},
  computed: {
    personMsg() {
      return this.$store.state.user.personMsg;
    }
  },
  data() {
    return {
      activeIndex: "1"
    };
  },

  methods: {}
};
</script>

<style scoped>
.right-item {
  float: right;
}

.menu-sm {
  text-align: right;
  margin: 5px 0px;
}

.bottom {
  background: #f2f8f2;
  color: #4f946e;
  text-align: center;
}
</style>