import {createMatcher} from "./createMatcher";

let Vue;
import RouterLink from "./components/RouterLink";
import RouterView from "./components/RouterView";
import HashHistory from "./history/hash";
import BrowserHistory from "./history/history";
class VueRouter{
    constructor(options = {}) {
        console.log('创造路由实例', options)
        // matcher中有动态添加路由addRoutes，路由的匹配方法match
        this.matcher = createMatcher(options.routes || []);
        // 路由模式： 默认3种， 实现 hash / history
        if (options.mode === 'hash') {
            this.history = new HashHistory(this)
        } else {
            this.history = new BrowserHistory(this)
        }
        // this.matcher.match匹配规则   this.history 路由系统
    }
    init (app) {
        // 实现：监听路径变化，渲染对应的组件
        const history = this.history;
        // hash:老版本中只用hashchange，新版本可以使用popstate（看兼容性）
        // 根据当前路径进行跳转，跳转完毕后监听hash值的变化
        history.listen((route) => {  // _route就是响应式的数据
            app._route = route //注册回调, 重新更新app._route =》 $route
        })
        const setupListenerHandler = () => {
            history.setupListener(); // 监听hash值的变化
        }
        history.transitionTo(history.getCurrentLocation(), setupListenerHandler)
    }
    match (location) {
        return this.matcher.match(location)
    }
    push (location) {
        // 跳转，更新路径
        this.history.transitionTo(location, () => {
            this.history.updateLocation(location)
        })
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
                this._router.init(this);
                // 将this._router.history.current变成响应式数据
                Vue.util.defineReactive(this,'_route', this._router.history.current);
            } else {
                // 是子组件 通过this._routerRoot._router取router实例
                this._routerRoot = this.$parent && this.$parent._routerRoot;
            }
        }
    })
    // 方便组件取值
    Object.defineProperty(Vue.prototype, '$route', {
        get () {
            return this._routerRoot._route;  // 响应式的记录
        }
    })
    Object.defineProperty(Vue.prototype, '$router', {
        get () {
            return this._routerRoot._router; // VueRouter的公共实例
        }
    })
}
export default VueRouter;
