# React+express SSR demo

## 服务端不会执行 `componentDidMount` 的问题

1. 服务器接受到请求，这个时候store是空的
2. 服务器端不会执行 `componentDidMount` ,所以列表内容获取不到
3. 客户端代码运行，这个时候 `store` 依然是空的
4. 客户端执行 `componentDidMount`,获取到列表数据
5. store 中的列表数据被更新
6. 客户端渲染出 `store` 中 list 对应的列表内容

## express-http-proxy

实现 代理 node中间层转发,同时使用axios 创建不同的 instance 简化分发的代码

## react-router-config 与 其 renderRoutes 方法

多级路由判断与渲染，并将路由参数传入全局的 props

## 登录遇到的问题，登录的流程

1. 刚进去页面，处于非登录状态
2. 用户点击登录按钮，进行登录操作
   1. 浏览器发送请求给 Node 服务器
   2. 转发给 api 服务器，进行登录
   3. api 服务器生成了 cookie 
   4. 浏览器上存在了 cookie，登录成功
3. 当用户重新刷新页面
   1. 浏览器去请求 html（携带了 cookie）
   2. NodeJS 服务器进行服务器端渲染
   3. 进行服务器端渲染，首先要去 api 服务器取数据（没有携带 cookie）从而导致了重新刷新页面，页面会跳转

解决的方案：

在 axios instance 里面添加 cookie

```javascript
cookie:req.get('cookie') || ''
```

由于 server/request 里面的instance 是一个实例，现在需要将它转变成为一个方法来传递 req

```javascript
export default createInstance = (req) => axios.create({
    baseURL:'xxx',
    headers:{
        cookie:req.get('cookie') || '';
    }
})
```

而这个 req 是在 server/index.js

```javascript
app.get('*',(req,res)=>{
    const store = getStore(req)
})
```

以及 store/index.js 之间转递过来的

```javascript
export const getStore = (req)=>{
    return createStore(reducer,applyMiddleware(thunk.withExtraArgument(serverAxios(req))))
}
```

## 某个页面加载出错导致所有页面无法加载展示的问题

```javascript
app.get('*', (req, res) => {
  const store = getStore(req);
  const matchedRoutes = matchRoutes(routes, req.path);
  const promises = [];
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store))
    }
  });
  Promise.all(promises).then(() => {
    const context = {};
    const html = render(store, routes, req, context);
    if (context.action === 'REPLACE') {
      res.redirect(301, context.url);
    } else if (context.NOT_FOUNT) {
      res.status(404);
      res.send(html)
    } else {
      res.send(html)
    }
  }).catch(() => {
    const context = {};
    const html = render(store, routes, req, context);
    if (context.action === 'REPLACE') {
      res.redirect(301, context.url);
    } else if (context.NOT_FOUNT) {
      res.status(404);
      res.send(html)
    } else {
      res.send(html)
    }
  })
})
```

上面的代码在下面的情况会有问题

一个页面要加载 A B C D 四个组件，这四哥组件都需要服务器端加载数据。假设 A 组件加载数据出错，B C D 组件有几种情况

1. BCD 组件已经加载完成了
2. BCD 接口比较慢，数据没有加载完成（这时候已经展示的就难以展示出来）

解决方案：

```javascript
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        // catch(resolve)
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promise)
    }
  });
```

在 promises 外面包多一层 Promise 无论请求成功与否都是触发 resolve 继续执行下去，保证 Promise.all 执行，可以显示已成功的组件，出错的不展示，更加友好。