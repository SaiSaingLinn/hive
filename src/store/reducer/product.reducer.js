import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  product_data: null,
}

const product = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case types.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product_data: action.data
      }
    case types.GET_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default product