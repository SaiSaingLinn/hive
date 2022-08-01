import * as types from '../types'
import serviceController, { routes } from 'controller'
import { ToDoError, ToDoRequest, ToDoSuccess } from '../actions/typehandle.action'
import { routeFilter } from 'src/components/utils'

const getProduct = (params) => async dispatch => {
  dispatch(ToDoRequest(types.GET_PRODUCT_REQUEST))
  return await serviceController(`${routes.productApi}?${routeFilter(params)}`)
    .then(res => {
      dispatch(ToDoSuccess(types.GET_PRODUCT_SUCCESS, res.data))
      return res
    })
    .catch(error => dispatch(ToDoError(types.GET_PRODUCT_ERROR, error.message)))
}

export const product = {
  getProduct,
}