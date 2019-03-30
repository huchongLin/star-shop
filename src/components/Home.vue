<template>
    <div>
         <header>
            <h1>星空购物</h1>
            <van-search placeholder='搜索商品名称或商品编号' shape="round"/>
            <span>登录</span>
        </header>
        <div class="wrap">
            <van-swipe :autoplay="3000" :height="200">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image" />
                </van-swipe-item>
            </van-swipe>
            <ul class="nav">
                <li>
                    <router-link to="/List"><p class="icon iconfont">&#xe610;</p><em>列表</em></router-link>
                </li>
                <li>
                    <router-link to="/Cart"><p class="icon iconfont">&#xe613;</p><em>购物车</em></router-link>
                </li>
                <li>
                    <router-link to="/Home"><p class="icon iconfont">&#xe615;</p><em>新品</em></router-link>
                </li>
                <li>
                    <router-link to="/About"><p class="icon iconfont">&#xe6d6;</p><em>我的星空</em></router-link>
                </li>
            </ul>
            <div class="zhiBo">
                <h2><i class="iconfont">&#xe6d6;</i>直播商品<a href="">更多>></a></h2>
                <van-card
                    price="2.00"
                    desc="描述信息"
                    title="商品标题"
                    :thumb="imageURL"
                />
            </div>
            <div class="reXiao">
                <h2><i></i>热销商品</h2>
                <ul class="_img">
                    <li v-for="(item,i) in reXiao" :key="i">
                        <router-link  :to="'/Detail/'+item._id">
                        <img :src="'https://api.cat-shop.penkuoer.com'+item.coverImg">
                        <p>￥{{item.price}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            images:[],
            imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2735633715,2749454924&fm=27&gp=0.jpg',
            reXiao:[]
        }
    },
    mounted() {
        axios.get('https://api.cat-shop.penkuoer.com/api/v1/products',{params:{'per':'6'}})
        .then(res =>{
          for(var i = 0; i < res.data.products.length;i++){
              this.images.push('https://api.cat-shop.penkuoer.com'+res.data.products[i].coverImg)
          }
           this.reXiao = res.data.products;
        })
    },
}
</script>

<style scoped>
 header h1{
        font-size: 1rem;
        float: left;
        height: 2.5rem;
        line-height: 2.5rem;
        margin: 0 0.625rem 0 0.9375rem;
        color: #515151;
    }
    header span{
        float: right;
        font-size: 0.875rem;
        height: 2.5rem;
        line-height: 2.5rem;
        margin-right: 0.625rem;
        color: #515151;

    }
    .van-search{
        width: 15rem;
        float: left;
        padding-top: 0.1875rem;
        padding-bottom:0.1875rem;
    }
    .wrap{
        height: auto;
        margin: 2.5rem 0 3.125rem 0;
        background:#f2f3f5;
    }
    header{
        height: 2.5rem;
        width:100%;
        position: fixed;
        top: 0;
        z-index: 1000;
        background: #fff;
    }
    .van-swipe{
        width: 100%;
    }
    .nav{
        border-top:0.3125rem solid #edf6f5;
        height: 5.3125rem;
        background: #fff;
    }
    .nav li{
        width: 25%;
        height: 3.75rem;
        float: left;
        text-align: center;
        margin: 0.9375rem 0;
        border-bottom: 10px solid #f2f3f7;
    }
    .nav em{
        font-style: normal;
        margin-top: 0.3125rem;
        display: block;
        font-size: 0.875rem;
        color: #000;
    }
    .nav p{
        height: 1.875rem;
        width: 1.875rem;
        background: #d7c4fc;
        line-height: 1.875rem;
        border-radius: 0.3125rem;
        margin-left: 2rem;
    }
    .nav .iconfont{
        color: #fff;
        font-size: 1.25rem;
    }
    .zhiBo{
        width: 100%;
        height: 12.5rem;
        background: #fff;
        border-bottom: 0.0625rem solid #dddfde;
    }
    .zhiBo h2{
        font-size: 1rem;
        height: 2.5rem;
        line-height: 0.75rem;
        font-weight: 200;
    }
    .zhiBo i{
        float: left;
        margin-left: 0.9375rem;
    }
    .zhiBo h2 a{
        float: right;
        margin-right: 1.25rem;
        font-size: 0.875rem;
        color: #15649f;
    }
    .van-card{
        height: 8.75rem;
    }
    .van-card__thumb{
        width: 7.5rem;
        height: 7.5rem;
    }
    .van-card__title{
        font-size: 1rem;
        height: 1.875rem;
    }
    .van-card__desc{
        font-size: 0.875rem;
        height: 1.5625rem;
        line-height: 1.5625rem;
    }
    .van-card__bottom{
        font-size: 0.875rem;
        height: 1.5625rem;
        line-height: 1.5625rem;
        margin-top: 0.625rem;
    }
    .van-card{
        background: #fff;
    }
    .reXiao{
        height: 18.125rem;
        background: #fff;
        margin-top: 0.625rem;
        padding: 0 0.9375rem 0 0.9375rem;
    }
    .reXiao h2{
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: 1rem;
        font-weight: 200;
    }
    .reXiao i{
        width: 0.3125rem;
        height: 1rem;
        background: #e81c35;
        float: left;
        margin: 0.75rem 0.3125rem 0 0;
    }
    .reXiao li{
        width: 33.33%;
        height: 7.8125rem;
        float: left;
    }
    .reXiao img{
        width: 5.625rem;
        height: 5.625rem;
        padding: 0 0.75rem;
        border-right: 0.0625rem solid #f5f5f5;
    }
    .reXiao p{
        text-align: center;
        color: #e81c35;
        font-size: 0.875rem;
        margin-top: 0.4375rem;
    }
    .reXiao li:nth-child(3) img{
        border: 0;
    }
    .reXiao li:nth-child(6) img{
        border: 0;
    }
</style>
