import * as types from '../types'
import { ecommerceStore } from "service"

const initialState = {
  place_order_data: null,
  isLoading: false,
  cart_data: ecommerceStore.getCart() || [],
}

const ecommerce = (state = initialState, action) => {
  switch (action.type) {
    case types.PLACE_ORDER_REQUEST: // place order
      return {
        ...state,
        isLoading: true
      }
    case types.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        place_order_data: action.data
      }
    case types.PLACE_ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        cart_data: action.data
      }
    case 'REMOVE_ALL_CART':
      return {
        ...state,
        cart_data: action.data
      }
    default:
      return state
    }
}

export default ecommerce