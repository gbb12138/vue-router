import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  name: 'root',
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// vue中路由有哪几种模式？访问不同页面，渲染不同的组件
// 在不刷新的情况下，切换路径
// hash（带#），不会向服务器发起请求，服务器无法获取hash值，没办法做seo优化，方便
// historyApi(默认不带#)，支持服务端渲染，可以做seo优化，需要服务端支持（如果访问的页面不存在，可以跳转到首页，渲染首页的内容，渲染的时候，前端会取到路径，渲染组件）
// memoryHistory不会发生路径变化，但可以切换组件（很少使用，微前端中我们不希望显示子应用的路径）
