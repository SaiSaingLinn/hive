import { ecommerceStore } from "service"

const setCart = (type, data) => {
  ecommerceStore.setCart(data)
  return ({
    type,
    data
  })
}

export const ecommerce = {
  setCart,
}