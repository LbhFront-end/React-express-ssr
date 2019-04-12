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

## react-router-config

多级路由判断与渲染，并将路由参数传入全局的 props