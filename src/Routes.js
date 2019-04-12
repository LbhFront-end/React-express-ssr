import React from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import Home from './containers/Home'
import Translation from './containers/Translation'
import NotFound from './containers/NotFound';

// export default (
//   <div>
//     <Route path="/" exact component={Home}></Route>
//     <Route path="/login" exact component={Login}></Route>
//   </div>
// )

export default [
  {
    path: "/",
    component: App,
    loadData: App.loadData,
    key: 'app',
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
        loadData: Home.loadData,
        key: 'home',
      }, {
        path: "/translation",
        component: Translation,
        exact: true,
        key: 'translation',
        loadData: Translation.loadData,
      }, {
        component: NotFound
      }
    ]
  },
]

