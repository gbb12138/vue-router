import Base from "./base";
function ensureHash () {
    if(window.location.hash) return
    window.location.hash = '/'
}
export default class HashHistory extends Base{
    constructor(router) {
        super(router)
        // 确保刷新的时候有hash =》#
        ensureHash()
    }
    // 获取当前的路径
    getCurrentLocation () {
        return window.location.hash.slice(1);
    }
    // 监听路径变化
    setupListener () {
        // 当页面hash变化时，重新去找当前路径对应的记录
        window.addEventListener('hashchange', () => {
            this.transitionTo(this.getCurrentLocation())
        })
    }
    updateLocation (location) {
        window.location.hash = location;  // 更改路径
    }
}
