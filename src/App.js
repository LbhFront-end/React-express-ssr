import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './component/Header';

const App = (props) => {
  return (
    <div>
      <Header />
      {/* 显示页面对应的内容 */}
      {renderRoutes(props.route.routes)}
    </div>
  )
}

export default App;