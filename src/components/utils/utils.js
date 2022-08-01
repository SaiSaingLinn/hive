const queryString = require('query-string')

const routeFilter = params => {
  let str = queryString.stringify(params)
  return str
}

export {
  routeFilter,
}