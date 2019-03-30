import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Register from '@/components/register'
import Index from '@/components/index'
import List from '@/components/list'
import Home from '@/components/home'
import About from '@/components/about'
import Detail from '@/components/detail'
import Cart from '@/components/cart'
import Sort from '@/components/sort'
import Vant from 'vant'
import 'vant/lib/index.css';
import { Toast } from 'vant'
Vue.use(Toast);
import { Lazyload } from 'vant';
Vue.use(Router)
Vue.use(Vant)
Vue.use(Lazyload);
export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path:'/Register',
      name:'Register',
      component:Register
    },
    {
      path:'/',
      name:'Index',
      component:Index,
      redirect:"/Home",
      children:[
        {
        path:'/Home',
        name:'Home',
        component:Home
      },
      {
        path:'/Sort',
        name:'Sort',
        component:Sort
      },
      {
        path:'/List',
        name:'List',
        component:List
      },
      {
        path:'/About',
        name:'About',
        component:About
      },
      {
        path:'/Cart',
        name:'Cart',
        component:Cart
      }]
    },
    {
      path:'/Detail/:id',
      name:'Detail',
      component:Detail
    }
  ]
})
