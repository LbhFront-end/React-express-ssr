import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { actions } from './components/Header/store/'

const App = (props) => {
  return (
    <div>
      <Header staticContext={props.staticContext} />
      {/* 显示页面对应的内容 */}
      {renderRoutes(props.route.routes)}
    </div>
  )
}
App.loadData = (store) => {
  return store.dispatch(actions.getHeaderInfo());
}

export default App;