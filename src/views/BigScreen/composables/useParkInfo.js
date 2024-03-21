import { ref } from 'vue'

import { getParkInfoApi } from '@/api/park'
export const useParkInfo = () => {
  // 保存获取到的数据
  const parkInfo = ref({})
  // 获取园区信息方法
  const getParkInfo = async () => {
    const res = await getParkInfoApi()
    parkInfo.value = res.data
  }
  return {
    parkInfo,
    getParkInfo
  }
}
