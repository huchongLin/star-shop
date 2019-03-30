<template>
    <div>
      <header>
        <i><van-icon name="arrow-left" /></i>
        <div class="Sou">
          <input type="text" id="txt" placeholder="搜索商品名称或商品编号">
          <i><van-icon name="search" /></i>
        </div>
        <i><van-icon name="description" /></i>
      </header>
        <van-tree-select
            :items="items"
            :main-active-index="mainActiveIndex"
            @navclick="onNavClick"
            @itemclick="onItemClick"
        />
    </div>
</template>

<script>
import Vue from 'vue'
import { TreeSelect } from 'vant';
Vue.use(TreeSelect);
export default {
  data() {
    return {
      items:[
  {
    // 导航名称
    text: '所有城市',
    // 该导航下所有的可选项
    children: [
      {
        text: '杭州',
        id: 1
      },
      {
        text:'上海',
        id:'2'
      },
      {
        text:'北京',
        id:'3'
      }
    ]
  },
  {
    // 导航名称
    text: '景点',
    // 该导航下所有的可选项
    children: [
      {
        text: '西湖',
        id: 1
      },
      {
        text:'寒山寺',
        id:'2'
      },
      {
        text:'九龙井',
        id:'3'
      }
    ]
  }
],
      // 左侧高亮元素的index
      mainActiveIndex: 0,
    };
  },
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    }
  }
}
</script>

<style scoped>
.van-tree-select__item{
  float: left;
  padding:0 1.25rem;
}
header{
  width: 100%;
  height: 2.5rem;
  background: #f9f9f9;
  border-bottom: 0.0625rem solid #e1e1e1;
}
i{
  float: left;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  font-size: 1.5625rem;
  color: #898989;
}
.Sou{
  width: 20.5625rem;
  height: 1.875rem;
  border: 0.0625rem solid #dbdbdb;
  border-radius: 0.3125rem;
  float: left;
  margin-top: 0.25rem;
}
#txt{
  float: left;
  border: 0;
  height: 1.875rem;
  background: #f9f9f9;
  width: 12.5rem;
  padding-left: 0.9375rem;
}
.Sou i{
  float: right;
  width: 1.875rem;
  height: 1.875rem;
  line-height: 1.875rem;
  border-left: 0.0625rem solid #dbdbdb;
  background: #ffffff;
}
</style>
