import React, { Component } from 'react';
import Header from '../../component/Header';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions'

class Home extends Component {
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
      <div>
        <Header />
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