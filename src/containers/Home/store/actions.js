import axios from 'axios';
import { CHANGE_LIST } from './constants';

const changeList = (list) => ({
  type: CHANGE_LIST,
  list
})

export const getHomeList = (server) => {
  // http://47.95.113.63/ssr/api/news.json?secret=PP87ANTIPIRATE
  // 浏览器运行：/api/news.json = http://localhost:3000/api/news.json
  // 服务器运行：/api/news.json = 服务器根目录下/api/news.json
  // let request = null;
  // if (server) {
  //   request = serverAxios;
  //   url = 'http://47.95.113.63/ssr/api/news.json?secret=PP87ANTIPIRATE'
  // } else {
  //   request = clientAxios;
  //   url = '/api/news.json?secret=PP87ANTIPIRATE'
  // }

  // 使用 axios instance 简写
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/news.json')
      .then((res) => {
        const list = res.data.data;
        dispatch(changeList(list))
      })
  }
}