import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '@/vue-router'
import Home from '../views/Home.vue'

/**
 * Vue.use方法
 Vue.use = function (plugin) {
  plugin.install(this)
}
 */
Vue.use(VueRouter)  // vue的路由也是一个插件

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {path: 'a', component: {name: 'a',render: (h) => <div>about a</div>}},
      {path: 'b', component: {name: 'b',render: (h) => <div>about b</div>}},
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
