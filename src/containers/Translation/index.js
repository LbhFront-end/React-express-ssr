import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getTranslationList } from './store/actions';
import styles from './style.css';
import withStyle from '../../withStyle'

class Translation extends Component {

  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getTranslationList();
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
      <Fragment>
        <Helmet>
          <title>这是lbh的SSR新闻页面-丰富多彩的资讯</title>
          <meta name="description" content="这是lbh的SSR新闻页面-丰富多彩的资讯" />
        </Helmet>
        {
          this.props.login ? <div className={styles.container}>
            {this.getList()}
          </div> : <Redirect to='/' />
        }
      </Fragment>
    )
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

const ExportTranslation = connect(mapStateToProps, mapDispatchToProps)(withStyle(Translation, styles));
ExportTranslation.loadData = (store) => {
  // 负责在服务器端渲染之前，把这个路由需要的数据提前加载好
  return store.dispatch(getTranslationList())
}

export default ExportTranslation;