import * as types from '../types'
import serviceController, { routes } from 'controller'
import { ToDoError, ToDoRequest, ToDoSuccess } from '../actions/typehandle.action'
import { authStore } from 'service'

const sendLogin = (data) => async dispatch => {
  dispatch(ToDoRequest(types.SEND_LOGIN_REQUEST))
  return await serviceController(routes.loginApi, data)
    .then(res => {
      if (res.status === 200) {
        dispatch(ToDoSuccess(types.SEND_LOGIN_SUCCESS, res))
        authStore.setAuth(res.data)
      }
      return res
    })
    .catch(error => dispatch(ToDoError(types.SEND_LOGIN_ERROR, error)))
}

const sendRegister = data => async dispatch => {
  dispatch(ToDoRequest(types.SEND_REGISTER_REQUEST))
  return await serviceController(routes.registerApi, data)
    .then(res => {
      if (res.status === 200) {
        dispatch(ToDoSuccess(types.SEND_REGISTER_SUCCESS, res))
        authStore.setAuth(res.data)
      }
      return res
    })
    .catch(error => dispatch(ToDoError(types.SEND_REGISTER_ERROR, error)))
}

const signOut = () => async dispatch => {
  dispatch(ToDoSuccess(types.SEND_LOGIN_SUCCESS, null))
  dispatch(ToDoSuccess(types.SEND_REGISTER_SUCCESS, null))
  authStore.removeAuth()
}

export const auth = {
  sendLogin,
  sendRegister,
  signOut,
}