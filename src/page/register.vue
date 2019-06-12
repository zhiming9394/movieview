<!--suppress ALL -->
<template>
  <div class="loginbody">
    <div class="mian-container">
      <el-form label-width="100px" ref="userform" :model="userform" :rules="loginRules">
        <div>
          <h3 class="title">注册</h3>
        </div>
        <el-form-item label="名称" prop="username" >
          <el-input type="text" v-model="userform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="userform.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @keyup.enter.native="submitForm('userform')" @click="submitForm('userform')">提交</el-button>
          <el-button @click="resetForm( )">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userRegister } from "../api/index";
export default {
  name: "register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error("名字设置请大于2个字符串"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码设置不大于6位字符串"));
      } else {
        callback();
      }
    };

    const validatePassword2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userform.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      userform: {
        username: "",
        password: "",
        checkPass: ""
      },

      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        checkPass: [
          { required: true, trigger: "blur", validator: validatePassword2 }
        ],
      }
    };
  },
  methods: {
    submitForm(userform) {
      this.$refs[userform].validate( (valid) => {
      if(!valid){
        this.$message.error('请正确填写以上内容');
        return 
      }
      const username = this.userform.username.trim();
      const password = this.userform.password.trim();
      return new Promise((resolve, reject) => {
        userRegister(username, password)
          .then(res => {
            if (res.data.success == false) {
              this.$message.error(res.data.error);
            } else {
              this.$message({
                message: "注册成功",
                type: "success"
              });

              this.$router.push({
                path: `/login`
              });
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
      })
    },
    resetForm() {}
  }
};
</script>

<style scoped>
.loginbody {
  overflow: hidden;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../public/image/register-back.jpg");
}
.mian-container {
  height: 500px;
  padding-right: 40px;
  -webkit-appearance: none;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: black;
  opacity: 0.7;
}
.title {
  text-align: center;
  color: #eee;
  margin-bottom: 30px;
  font-size: 32px;
  letter-spacing: 20px;
}
.item-style {
  margin-right: 40px;
}
.el-form-item__label {
  color: aliceblue;
}
.button {
  margin: 0 auto;
}
</style>