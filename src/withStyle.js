// 生成高阶组件的函数，返回一个组件
import React, { Component } from 'react';

export default (DecoratedComponent, styles) => {
  return class NewComponent extends Component {
    componentWillMount() {
      // 如果是服务器端渲染则可以输出，也可以用 this.props.staticContext 是否是对象来判断是否服务器端渲染，把css注入到staticContext
      if (styles._getCss) {
        this.props.staticContext.css.push(styles._getCss());
      }
    }
    render() {
      return <DecoratedComponent {...this.props} />
    }
  }
}