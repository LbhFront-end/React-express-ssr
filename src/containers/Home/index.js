import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions'
import styles from './style.css';
import withStyle from '../../withStyle';

class Home extends Component {

  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getHomeList();
    }
  }

  getList() {
    const { list } = this.props;
    return (
      list.map((item) => <div className={styles.item} key={item.id}>{item.title}</div>)
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.getList()}
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

const ExportHome = connect(mapStateToProps, mapDispatchToProps)(withStyle(Home, styles));
ExportHome.loadData = (store) => {
  // 负责在服务器端渲染之前，把这个路由需要的数据提前加载好
  return store.dispatch(getHomeList())
}

export default ExportHome;