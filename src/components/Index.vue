<template>
    <div>
            <router-view></router-view>
        <footer>
            <van-tabbar v-model="active" active-color="#f82d30">
                <van-tabbar-item icon="wap-home" :to="{name:'Home'}">首页</van-tabbar-item>
                <van-tabbar-item icon="apps-o" :to="{name:'List'}" dot>分类</van-tabbar-item>
                <van-tabbar-item icon="cart-o" @click="Cart">购物车</van-tabbar-item>
                <van-tabbar-item icon="contact" @click="About">我的</van-tabbar-item>
            </van-tabbar>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active:0
        }
    },
    methods:{
        Cart (){
            if(localStorage.getItem('token') == null){
                this.$router.push('/Login')
            }else{
                this.$router.push('/Cart')
            }
        },
        About (){
            if(localStorage.getItem('token') == null){
                this.$router.push('/Login')
            }else{
                this.$router.push('/About')
            }
        }
    }
}
</script>

<style scoped>

</style>
