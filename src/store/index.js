import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as homeReducer } from '../containers/Home/store';

const reducer = combineReducers({
  home: homeReducer
})

// 返回 getStore 而不是 store 保证每个用户的 store 是不一样的
export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk))
}

export const getClientStore = () => {
  const defaultState = window.context.state;
  return createStore(reducer, defaultState, applyMiddleware(thunk))
}
