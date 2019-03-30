<template>
  <div>
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-cell-group>
      <van-cell>
        <div class="goods-title">
          <img :src="'http://api.cat-shop.penkuoer.com'+goods.img">
        </div>
        <div class="goods-title">{{ goods.name }}</div>
        <div class="goods-title">{{ goods.jieshao }}</div>
        <div class="goods-price">￥：{{ goods.price }}</div>
      </van-cell>
    </van-cell-group>
    <van-goods-action>
      <van-goods-action-mini-btn icon="chat-o" text="客服"/>
      <van-goods-action-mini-btn @click="onClickCart" :info="goods.num" icon="cart-o" text="购物车"/>
      <van-goods-action-mini-btn icon="shop-o" text="店铺"/>
      <van-goods-action-big-btn text="加入购物车" @click="goCart()"/>
      <van-goods-action-big-btn primary text="立即购买"/>
    </van-goods-action>
  </div>
</template>

<script>
import { get } from "axios";
import { post } from "axios";

export default {
  components: {},
  data() {
    return {
      goods: {
        id: "",
        img: "",
        descriptions: "",
        name: "",
        jieshao: "",
        price: "",
        num: '0'
      }
    };
  },
  mounted() {
    get(
      "https://api.cat-shop.penkuoer.com/api/v1/products/" +
        this.$route.params.id
    )
      .then(res => {
        this.goods.img = res.data.coverImg;
        this.goods.descriptions = res.data.descriptions;
        this.goods.price = res.data.price;
        this.goods.name = res.data.name;
        this.goods.jieshao = res.data.descriptions;
        this.goods.id = res.data._id;
      })
      .catch(err => {
        console.log(err);
      });
      //请求购物车数据
      get("https://api.cat-shop.penkuoer.com//api/v1/shop_carts", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      this.goods.num = res.data.length;
    })
  },
  methods: {
    formatPrice() {
      return "¥" + (this.goods.price / 100).toFixed(2);
    },
    onClickCart() {
      this.$router.push("/cart");
    },

    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    },
    goCart() {
      //加入购物车
       post(
        "https://api.cat-shop.penkuoer.com/api/v1/shop_carts",
        { product: this.goods.id, quantity: this.goods.num },
        {
          headers: { authorization: ` Bearer ${localStorage.getItem("token")}` }
        }
      ).then(res => {
        //请求购物车数据
       get("https://api.cat-shop.penkuoer.com//api/v1/shop_carts", {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
          this.goods.num = res.data.length;
          console.log( res.data.length);
        })
          this.$toast('加入成功');
      });
    }
  }
};
</script>

<style scoped="">
.goods-price {
  color: red;
  font-size: 20px;
}
</style>


