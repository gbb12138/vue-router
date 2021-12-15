import {createRouteMap} from "./createRouteMap";

// {'/': 记录, '/about': 记录, '/about/a': 两条记录}
export function createMatcher (routes) {  // 匹配器
    const {pathMap} = createRouteMap(routes); // 创建一个路径和记录的映射表
    // 一个路径对应的记录是谁，这个记录有没有父亲，如果有父亲，创建一个关联

}
