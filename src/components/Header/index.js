import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from './store/';

class Header extends Component {
  render() {
    const { login, handleLogin, handleLogout } = this.props;
    return (
      <div>
        <Link to="/">首页</Link>&nbsp;|
        {
          login ?
            <Fragment>
              &nbsp;<Link to="/translation">翻译列表</Link>&nbsp;
              |&nbsp;<span onClick={handleLogout}>退出</span>
            </Fragment>
            :
            <Fragment>
              &nbsp;<span onClick={handleLogin}>登录</span>&nbsp;
            </Fragment>
        }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  login: state.header.login
})

const mapDispatchToProps = dispatch => ({
  handleLogin() {
    dispatch(actions.login());
  },
  handleLogout() {
    dispatch(actions.logout());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);