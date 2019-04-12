import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getTranslationList } from './store/actions';

class Translation extends Component {

  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getTranslationList();
    }
  }

  getList() {
    const { list } = this.props;
    return (
      list.map((item) => <div key={item.id}>{item.title}</div>)
    )
  }

  render() {
    return this.props.login ? <div>
      {this.getList()}
    </div> : <Redirect to='/' />
  }
}

const mapStateToProps = state => ({
  list: state.translation.translationList,
  login: state.header.login
})

const mapDispatchToProps = dispatch => ({
  getTranslationList() {
    dispatch(getTranslationList())
  }
})

Translation.loadData = (store) => {
  // 负责在服务器端渲染之前，把这个路由需要的数据提前加载好
  return store.dispatch(getTranslationList())
}

export default connect(mapStateToProps, mapDispatchToProps)(Translation);