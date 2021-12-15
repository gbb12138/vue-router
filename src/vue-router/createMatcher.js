import {createRouteMap} from "./createRouteMap";

// {'/': 记录, '/about': 记录, '/about/a': 两条记录}
export function createMatcher (routes) {  // 匹配器
    const {pathMap} = createRouteMap(routes); // 创建一个路径和记录的映射表

    /**
     * 动态添加路由，将原来的pathMap传入，往传入的pathMap中继续追加
     * @param routes
     */
    function addRoutes (routes) {
        createRouteMap(routes, pathMap)
    }
    // 用户登陆后，验证权限，将权限对应的路由信息加进去
    addRoutes([
        {
            path: '/about',
            children: [
                {
                    path: 'c',
                    component: () => {}
                }
            ]
        }
    ])
    // console.log(pathMap, 555)

    function match (location) {  // 传入路径，找到匹配的记录
        // /about/a
        let record = pathMap[location]; // 根据路径找到匹配的数组
        // {path: '/about/a', matched: [about组件，a组件]}
        if (record) { // 找到了路径对应的记录， 需要找该路径是否有父路径
            return createRoute(record, {
                path: location
            })
        }
        // 没有记录，返回的记录为空
        return createRoute(null, {
            path: location
        })

    }
   // console.log(match('/about/c'))



    // 一个路径对应的记录是谁，这个记录有没有父亲，如果有父亲，创建一个关联

    return {
        addRoutes,
        match
    }
}

/**
 * 找到匹配记录的所有父亲记录
 * @param record
 * @param path
 */
export function createRoute (record, { path }) {
    let matched = [];
    while(record) {  // 直到找到最上层的record
        matched.unshift(record);
        record = record.parent;
    }
    return {
        path,
        matched
    }
}
