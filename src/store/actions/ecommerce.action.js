import * as types from '../types'
import { ecommerceStore } from "service"
import serviceController, { routes } from 'controller'
import { ToDoError, ToDoRequest, ToDoSuccess } from '../actions/typehandle.action'

const setCart = (type, data) => {
  ecommerceStore.setCart(data)
  return ({
    type,
    data
  })
}

const placeOrder = (data) => async dispatch => {
  dispatch(ToDoRequest(types.PLACE_ORDER_REQUEST))
  return await serviceController(routes.placeOrderApi, data)
    .then(res => {
      dispatch(ToDoSuccess(types.PLACE_ORDER_SUCCESS, res.data))
      return res
    })
    .catch(error => dispatch(ToDoError(types.PLACE_ORDER_ERROR, error.message)))
}

export const ecommerce = {
  setCart,
  placeOrder
}