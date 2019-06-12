<!--suppress ALL -->
<template>
    <div class="loginbody">
        <div class="mian-container">
        <el-form label-width="100px" >
            <div>
                <h3 class="title">登录</h3>
            </div>
            <el-form-item label="用户昵称" class="item-style">
                <el-input type="text" v-model="loginform.username" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="密码" class="item-style">
                <el-input type="password" v-model="loginform.passwork" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="item-style">
                <el-button class="loginbtn" type="primary" @click="submitForm( )">登录</el-button>
                <!-- <router-link to="/register">
                <el-button class="loginbtn" type="primary">注册</el-button>
                </router-link> -->
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loginform: {
                    username: "",
                    password: "",
                },
            };
        },
        methods: {
            submitForm() {
            this.$store.dispatch('Login', this.loginform).then(
        (res) => {
            this.$router.push({path: `/indexCompents`})},
        (msg)=>{this.$message.error(msg)
        }).catch(() => {
            this.loading = false
          })
            }
        }
    }
</script>

<style scoped>

    .loginbody{
        overflow: hidden;
        width: 100%;
        min-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../../public/image/loginbody.jpg");
        /* background-size: 100% auto; */
    }
    .mian-container{
        height: 500px;
        -webkit-appearance: none;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        display: flex;
        justify-content:center;
        align-items: center;
        background-color:black;
        opacity:0.7;
}
    .title{
        text-align: center;
        color: #eee;
        margin-bottom: 30px;
        font-size: 32px;
        letter-spacing:20px;
    }
    .item-style{
        margin-right: 40px;

    }
    .el-form-item__label{
        color: aliceblue;
    }

    .loginbtn{
        width: 100%;
    }
</style>