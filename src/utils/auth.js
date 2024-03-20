import Cookies from 'js-cookie'

const TOKEN_KEY = 'Authorization-token'

// 读取cookie
export const getCookie = () => {
  Cookies.get(TOKEN_KEY)
}
// 设置cookie
export const setCookie = (value) => {
  Cookies.set(TOKEN_KEY, value)
}
// 清空cookie
export const removeCookie = () => {
  Cookies.remove(TOKEN_KEY)
}
