import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions'
import styles from './style.css';

class Home extends Component {
  componentWillMount() {
    // 如果是服务器端渲染则可以输出，也可以用 this.props.staticContext 是否是对象来判断是否服务器端渲染，把css注入到staticContext
    if (styles._getCss) {
      this.props.staticContext.css = styles._getCss();
    }
  }

  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getHomeList();
    }
  }

  getList() {
    const { list } = this.props;
    return (
      list.map((item) => <div key={item.id}>{item.title}</div>)
    )
  }

  render() {
    return (
      <div className={styles.test}>
        {this.getList()}
        <button onClick={() => alert('click!')}>click</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.home.newList,
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList());
  }
})

Home.loadData = (store) => {
  // 负责在服务器端渲染之前，把这个路由需要的数据提前加载好
  return store.dispatch(getHomeList())
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);