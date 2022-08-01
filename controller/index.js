import httpClient from './constant/httpClient'
export * from './constant/routes'

const controller = async (endpoint, ...data) => {
  let tmp = endpoint.split(':')
  return await httpClient[tmp[0]](tmp[1], ...data)
    .then(res => res && res)
    .catch(error => error)
}

export default controller