const setCart = data => {
  if (typeof window !== 'undefined') {
    let CryptoJS = require('crypto-js')
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'cart_info')
  
    localStorage.setItem('cartInfo', ciphertext.toString())
  }
}

const getCart = () => {
  if (typeof window !== 'undefined') {
    let CryptoJS = require('crypto-js')
    let sessi = localStorage.getItem('cartInfo')
    if (!sessi) return false
    let bytes = CryptoJS.AES.decrypt(sessi, 'cart_info')
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
  }
}

export default { 
  setCart, 
  getCart, 
}