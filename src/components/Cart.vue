
<template>
  <div>
    <header>
      <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </header>
    <div class="Cart">
      <van-checkbox-group class="card-goods" v-model="checkedGoods">
        <van-checkbox
          class="card-goods__item"
          v-for="(item,i) in goods"
          :key="item.product._id"
          :name="item.product._id"
        >
          <van-card
            :title="item.product.name"
            :desc="item.product.descriptions"
            :price="formatPrice(item.product.price)"
            :thumb="'http://api.cat-shop.penkuoer.com'+item.product.coverImg"
          />
          <van-button size="mini" class="del" type="danger" @click.stop="del(item._id,i)">删除</van-button>
        </van-checkbox>
      </van-checkbox-group>
      <van-submit-bar
        :price="totalPrice"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from "vant";
import { get } from "axios";
import axios from "axios";
export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      checkedGoods: [],
      goods: [],
      value: 1,
    };
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return "结算" + (count ? `(${count})` : "");
    },
    totalPrice() {
      return this.goods.reduce(
        (total, item) =>
          total +
          (this.checkedGoods.indexOf(item.product._id) !== -1 ? item.product.price * 100 : 0),
        0
      );
    }
  },
  methods: {
    formatPrice(price) {
      return price.toFixed(2);
    },
    onSubmit() {
      Toast("点击结算");
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    del (id,index){
      axios.delete('https://api.cat-shop.penkuoer.com/api/v1/shop_carts/'+id,{
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      }).then(res => {
        if(res.data != null){
          this.goods.splice(index,1)
          this.checkedGoods.splice(index,1)
        }
      })
    }
  },
  mounted() {
    get("https://api.cat-shop.penkuoer.com//api/v1/shop_carts", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].product != null) {
          this.checkedGoods.push(res.data[i].product._id);
          this.goods.push(res.data[i]);
        }
      }
    })
  }
};
</script>

<style lang="less" scoped>
.del{
  float: right;
    margin-bottom: 0.25rem;
    position: absolute;
    right: 1.125rem;
    z-index: 100;
    top: 2.5rem;
    background: red;
    color: #fff;
    z-index: 50;
}
.van-checkbox__label{
position: relative;
}
header{
  position: fixed;
  width: 100%;
  height: auto;
  top: 0;
  z-index: 100;
  background: #fff;
}
.Cart{
  margin-top: 2.875rem;
  height: auto;
}
.van-card__desc {
  width: 12.5rem;
  overflow: hidden;
}
.card-goods {
  padding: 0.625rem 0;
  background-color: #fff;
  &__item {
    position: relative;
    background-color: #fafafa;
    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 0.625rem 0 0.9375rem;
      box-sizing: border-box;
    }
    .van-checkbox__icon {
      top: 50%;
      left: 0.625rem;
      z-index: 1;
      position: absolute;
      margin-top: -0.625rem;
    }
    .van-card__price {
      color: #f44;
    }
  }
}
</style>
