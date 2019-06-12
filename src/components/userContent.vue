<template>
    <el-container>
        <el-aside>
            <el-menu default-active="2" class="el-menu-vertical-demo">
                <router-link to="/userContent/myinfo">
                <el-menu-item index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>我的信息</span>
                    </template>
                </el-menu-item>
                </router-link>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">动态</span>
                </el-menu-item>
                <router-link to="upLoadMoive" >
                <el-menu-item index="3" >
                    <i class="el-icon-document"></i>
                    <span>上传</span>
                </el-menu-item>
                </router-link>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="main-container">
            <router-view/>
        </el-main>
    </el-container>
</template>
<script>
export default {
name: "userContent"
}
</script>

<style scoped>
    .main-container{
        margin-right: 200px;
    }
</style>