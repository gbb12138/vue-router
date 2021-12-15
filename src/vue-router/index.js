import {createMatcher} from "./createMatcher";

let Vue;
import RouterLink from "./components/RouterLink";
import RouterView from "./components/RouterView";
class VueRouter{
    constructor(options = {}) {
        console.log('创造路由实例', options)
        this.marcher = createMatcher(options.routes || [])
    }
    init (app) {
        // 实现：监听路径变化，渲染对应的组件
    }
}
VueRouter.install = function (_vue) {
    Vue = _vue;
    console.log('install',Vue)
    Vue.component('router-link', RouterLink)
    Vue.component('router-view', RouterView)
    // VueRouter（在router -> index中创建）会创建一个实例，所有组件共用这一个实例
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                // 将根组件this保存到_routerRoot，子组件的_routerRoot也指向父组件_routerRoot
                // 子组件通过this._routerRoot._router访问公共的router实例
                //通过暴露
                this._routerRoot = this
                this._router = this.$options.router;
                this._router.init(this)
            } else {
                // 是子组件 通过this._routerRoot._router取router实例
                this._routerRoot = this.$parent && this.$parent._routerRoot;
            }
        }
    })
}
export default VueRouter;
