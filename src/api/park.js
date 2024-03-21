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

// 获取点击的楼宇信息
export const getBuildingInfoApi = (id) => {
  console.log('===>', id)
  return request({
    url: '/park/statistics/building',
    method: 'get',
    params: {
      id
    },
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjE4NDUxZTkxLWQxYjMtNDJiOC1iZmI0LTllZDAwYzc4MTQwZiJ9.kL7GqH0AhDOOQt5bybobo_XZqwLMW1Xa3OMVCcwrtx0r7Q2n46vRhet4upZWCcu2WRTv9iNg6VtCshCiXMDCKw'
    }
  })
}

// 获取点击的停车场信息
export const getAreaInfoApi = (id) => {
  return request({
    url: `/parking/area/${id}`,
    method: 'get',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjE4NDUxZTkxLWQxYjMtNDJiOC1iZmI0LTllZDAwYzc4MTQwZiJ9.kL7GqH0AhDOOQt5bybobo_XZqwLMW1Xa3OMVCcwrtx0r7Q2n46vRhet4upZWCcu2WRTv9iNg6VtCshCiXMDCKw'
    }
  })
}
