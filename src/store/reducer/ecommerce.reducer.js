import { ecommerceStore } from "service"

const initialState = {
  cart_data: ecommerceStore.getCart() || [],
}

const ecommerce = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart_data: action.data
      }
    default:
      return state
    }
}

export default ecommerce