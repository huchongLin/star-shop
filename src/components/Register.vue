<template>
  <div class="register">
    <van-nav-bar title="会员注册" left-arrow @click-left="onClickLeft"/>
    <van-cell-group>
      <van-field v-model="username" placeholder="请输入用户名" label="用户名" clearable/>
      <van-field v-model="password" placeholder="请输入密码" label="密码" clearable/>
      <van-field v-model="sms" center clearable label="验证码" placeholder="请输入验证码">
        <van-button @click="getSmsAuthHandle" slot="button" size="small" type="danger">点击获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <van-row type="flex" justify="center">
      <van-col span="12">
        <router-link to class="xieyi">《星空购物用户协议》</router-link>
      </van-col>
    </van-row>

    <van-button type="danger" size="large" class="btn-login" @click="registerHandle">同意协议并注册</van-button>

    <van-row type="flex" justify="end">
      <van-col span="6">
        <router-link to class="btn-bangding">老用户绑定</router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { post } from "axios";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      sms: ""
    };
  },
  methods: {
    getSmsAuthHandle() {
      this.sms = "1234";
    },
    registerHandle() {
      if (this.username == "" || this.password == "") {
        alert("请输入账号或者密码");
        return;
      }
      post("http://api.cat-shop.penkuoer.com/api/v1/auth/reg", {
        userName: this.username,
        password: this.password
      }).then(res => {
        if (res.data.code == "success") {
          alert("注册成功");
          console.log(res.data.token);
          this.$router.push("/Login");
        } else {
          alert("用户名已被注册");
        }
        console.log(res);
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.xieyi {
  color: #f44;
  margin: 0.5rem 0;
  display: block;
}
.btn-bangding {
  color: #999;
  display: block;
  padding-top: 0.5rem;
  text-decoration: underline;
}
header{
  height: 2.45rem;
  line-height: 2.45rem;
  text-align: center;
  background: orange
}
</style>
