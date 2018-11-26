import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token-Itheima'

export function getToken () {
  console.log(Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  debugger
  console.log(Cookies.set(TokenKey, token))
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  debugger
  return Cookies.remove(TokenKey)
}
