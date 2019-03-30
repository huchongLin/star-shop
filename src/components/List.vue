<template>
  <div>
    <header>
      <i>
        <van-icon name="arrow-left" @click="tap()"/>
      </i>
      <div class="Sou">
        <input type="text" id="txt" placeholder="搜索商品名称或商品编号">
        <i>
          <van-icon name="search"/>
        </i>
      </div>
      <i>
        <van-icon name="description"/>
      </i>
    </header>
    <ul class="nav">
      <li v-for="(item,index) in arr" :key="index" class="aa" :class="{ red:changeRed == index}" @click="change(index)">{{item}}</li>
    </ul>
    <div class="_list">
      <van-card
        v-for="product in products"
        :num="product.quantity"
        :price="product.price"
        :desc="product.descriptions"
        :title="product.name"
        :thumb="'http://api.cat-shop.penkuoer.com'+product.coverImg"
        :key="product._id"
        :thumb-link="`#/Detail/${product._id}`"
      />
    </div>
  </div>
</template>
<script>
import { get } from "axios";
export default {
  name: "List",
  data() {
    return {
      products: [],
      arr:['综合','销量','价格','上架时间'],
      changeRed:-1
    }
  },
  created() {
    get("http://api.cat-shop.penkuoer.com/api/v1/products")
      .then(res => {
        this.products = res.data.products;
      })
      .catch(err => {
        alert(err)
      });
  },
  methods: {
    change (index) {
            this.changeRed = index;
      },
      tap(){
        this.$router.go(-1)
      }
  },
};
</script>
<style scoped>
.aa{
        cursor: pointer;
    }
    .red{
        color: red;
    }

.nav{
  height: 2.5rem;
  width: 100%;
  position: fixed;
  top: 2.5rem;
  z-index: 100;
  background: #fff;
}
.nav li{
  float: left;
  line-height: 2.5rem;
  width: 25%;
  text-align: center;
}
._list {
  width: 100%;
  height: auto;
  margin: 5.0625rem 0 3.125rem 0;
}
header {
  width: 100%;
  height: 2.5rem;
  background: #f9f9f9;
  border-bottom: 0.0625rem solid #e1e1e1;
  position: fixed;
  top: 0;
  z-index: 100;
}
i {
  float: left;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  font-size: 1.5625rem;
  color: #898989;
}
.Sou {
  width: 20.5625rem;
  height: 1.875rem;
  border: 0.0625rem solid #dbdbdb;
  border-radius: 0.3125rem;
  float: left;
  margin-top: 0.25rem;
}
#txt {
  float: left;
  border: 0;
  height: 1.875rem;
  background: #f9f9f9;
  width: 12.5rem;
  padding-left: 0.9375rem;
}
.Sou i {
  float: right;
  width: 1.875rem;
  height: 1.875rem;
  line-height: 1.875rem;
  border-left: 0.0625rem solid #dbdbdb;
  background: #ffffff;
}
</style>
