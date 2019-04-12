import { CHANGE_LOGIN } from './constants';
const changeLogin = (value) => ({
  type: CHANGE_LOGIN,
  value
})

export const login = () => {
  return (dispatch, getState, axiosInstace) => {
    return axiosInstace.get('/api/login.json').
      then((res) => {
        dispatch(changeLogin(true))
      })
  }
}
export const logout = () => {
  return (dispatch, getState, axiosInstace) => {
    return axiosInstace.get('/api/logout.json').
      then((res) => {
        dispatch(changeLogin(false))
      })
  }
}
export const getHeaderInfo = () => {
  return (dispatch, getState, axiosInstace) => {
    return axiosInstace.get('/api/isLogin.json').
      then((res) => {
        dispatch(changeLogin(res.data.data.login))
      })
  }
}