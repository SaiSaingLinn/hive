import * as types from '../types'
import { authStore } from 'service'

const initialState = {
  error: null,
  isLoading: false,
  sentLogin_data: authStore.getAuth() || null,
  sentRegister_data: authStore.getAuth() || null,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case types.SEND_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sentLogin_data: action.data
      }
    case types.SEND_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.SEND_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case types.SEND_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sentRegister_data: action.data
      }
    case types.SEND_REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default auth