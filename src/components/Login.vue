<template>
  <div class="login">
    <van-nav-bar
      title="会员登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-field v-model="username" placeholder="请输入用户名" clearable/>
      <van-field v-model="password" type="password" placeholder="请输入密码" clearable/>
    </van-cell-group>
    <van-button type="danger" size="large" class="btn-login" @click="loginHandle">登录</van-button>
    <van-row type="flex" justify="space-between" class="box-user">
      <van-col span="6">
        <router-link to>找回密码</router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/Register">用户注册</router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>


import { Toast } from 'vant';

import { post } from "axios";

export default {
  name: "Login",
  data() {
    return {

        username:'',
        password:'',

    }
  },
  methods: {
     loginHandle(){

      post("http://api.cat-shop.penkuoer.com/api/v1/auth/login",
      {'userName':this.username,'password':this.password})
    .then(res=>{

            if(res.data.code=="success"){
               Toast.success('登陆成功');
               localStorage.setItem('token',res.data.token)
               localStorage.setItem('username',JSON.stringify(this.username))
               this.$router.push('/')

            }else{
              alert('账号或密码错误')
            }

    })

    },
    onClickLeft(){
      this.$router.go(-1)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-login {
  margin-top: 1.5rem;
}
.box-user {
  margin-top: 1rem;
}
.box-user a {
  color: #999;
  text-decoration: underline;
}
.login {
  padding: 1rem;
}
</style>

