export function createRouteMap (routes) {
    let pathMap = {};
    routes.forEach(route => {
        addRouteRecord(route, pathMap)
    })
    console.log(pathMap, 555)
    return {
        pathMap
    }
}

/**
 * 往路由映射中添加一条记录，route =》 record
 */
export function addRouteRecord (route, pathMap, parent) {
    // 如果有父路由，拼接上父组件的路由  例如a组件的path是a  =》 拼接成/about/a
    let path = parent ? `${parent.path}/${route.path}`: route.path;
    let record = {
        path: route.path,
        name: route.name,
        component: route.component,
        parent    // 构建父子关系，匹配路径的时候 /about/a 找记录中有没有parent，如果有parent，将parent的记录也找到,记录为[parentRecord, childRecord]
    }
    if (!pathMap[path]) {
        // 防止同一个路径定义多次
        pathMap[path] = record
    }
    // 如果有子路由， 递归添加映射
    if (route.children) {
        route.children.forEach(child => {
            addRouteRecord(child, pathMap, record)
        })
    }
}
