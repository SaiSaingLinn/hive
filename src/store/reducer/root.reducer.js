import { combineReducers } from "redux";
import ecommerce from "./ecommerce.reducer";
import auth from './auth.reducer';
import product from './product.reducer';

export default combineReducers({
  ecommerce,
  auth,
  product
})