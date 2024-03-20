import request from '@/utils/request'

// 获取园区大屏-查询楼宇概况 收入和产业信息接口
export const getParkInfoApi = () => {
  return request({
    url: '/park/statistics/info',
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjE4NDUxZTkxLWQxYjMtNDJiOC1iZmI0LTllZDAwYzc4MTQwZiJ9.kL7GqH0AhDOOQt5bybobo_XZqwLMW1Xa3OMVCcwrtx0r7Q2n46vRhet4upZWCcu2WRTv9iNg6VtCshCiXMDCKw'
    }
  })
}
