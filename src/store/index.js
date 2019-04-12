import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as homeReducer } from '../containers/Home/store';
import { reducer as headerReducer } from '../components/Header/store';
import { reducer as translationReducer } from '../containers/Translation/store';
import clientAxios from '../client/request';
import serverAxios from '../server/request';

const reducer = combineReducers({
  home: homeReducer,
  header: headerReducer,
  translation: translationReducer,
})

// 返回 getStore 而不是 store 保证每个用户的 store 是不一样的
export const getStore = (req) => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))))
}

export const getClientStore = () => {
  const defaultState = window.context.state;
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
