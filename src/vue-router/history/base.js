import {createRoute} from "../createMatcher";

export default class Base{
    constructor(router) {
        this.router = router;
        // 将current属性变成响应式的，如果在渲染router-view时候用到了这个current，等current变化了就可以重新刷新视图
        this.current = createRoute(null, {path: '/'})
    }

    // 根据路径拿到对应的record
    transitionTo(location, callback) {
        // 根据路径进行匹配，匹配到对应的记录
        let record = this.router.match(location);
        // console.log(this.current, 666)
        // record发生变化，需要渲染页面   =》 响应式数据
        this.current = createRoute(record, {path: location}); // 找到父路径，得到record的数组
        console.log(this.current, 7777)
        this.cb && this.cb(this.current);
        callback && callback();   // callback只有router实例init时传入了
    }
    listen (cb) {
       this.cb = cb;
    }
}

