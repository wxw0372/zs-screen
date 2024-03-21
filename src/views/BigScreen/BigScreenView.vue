<script setup>
import { ref, onMounted, computed } from 'vue'
// 导入模型解析构造函数
import { Application } from '@splinetool/runtime'
import { getAreaInfoApi, getBuildingInfoApi } from '@/api/park.js'
// 引入大屏适配
import VScaleScreen from 'v-scale-screen'
import { useParkInfo } from './composables/useParkInfo'
import { useInitBarChart } from './composables/useInitBarChart'
import { useInitPieChart } from './composables/useInitPieChart'
const { parkInfo, getParkInfo } = useParkInfo()
const { initBarChart } = useInitBarChart(parkInfo)
const { initPieChart } = useInitPieChart(parkInfo)

// 初始化3d模型
const ref3d = ref(null)
const loadStatus = ref(false)
const showModel = ref(false)
let x = ref()
let y = ref()
const buildingInfo = ref('')
const areaInfo = ref('')
const init3dModel = () => {
  loadStatus.value = true
  // 实例化解析器实例
  let spline = new Application(ref3d.value)
  // 拉取模型
  spline.load('https://fe-hmzs.itheima.net/scene.splinecode').then(() => {
    // 模型加载完毕
    console.log('3D模型加载并渲染完毕')
    loadStatus.value = false
  })

  spline.addEventListener('mouseDown', (e) => {
    x.value = ''
    y.value = ''
    // 坐标 没有
    console.log('e', e)
    // {name : '' , id : ''}
    const params = e.target

    // const obj = spline.findObjectByName(params.name)

    console.log('obj', params)

    buildingInfo.value = ''
    areaInfo.value = ''
    if (params.name.indexOf('办公楼') !== -1) {
      console.log('楼宇')
      console.log('--->', params.id)
      getBuildingInfo(params.id)
      window.addEventListener('mousedown', (e) => {
        x.value = e.offsetX
        y.value = e.offsetY
      })
    } else if (params.name.indexOf('停车场') !== -1) {
      console.log('停车场')
      getAreaInfo(params.id)
      window.addEventListener('mousedown', (e) => {
        x.value = e.offsetX
        y.value = e.offsetY
      })
    }
    showModel.value = true
  })
}

const getBuildingInfo = async (id) => {
  try {
    const res = await getBuildingInfoApi(id)
    console.log('res', res)
    buildingInfo.value = res.data
  } catch (e) {
    console.log(e)
  }
}

const getAreaInfo = async (id) => {
  try {
    const res = await getAreaInfoApi(id)
    console.log('area', res)
    areaInfo.value = res.data
  } catch (e) {
    console.log(e)
  }
}
onMounted(async () => {
  // 调用获取园区信息方法
  await getParkInfo()
  initBarChart()
  initPieChart()
  init3dModel()
})

const modelStatus = computed(() => {
  if (x.value && y.value) {
    return true
  } else {
    return false
  }
})

const close = () => {
  x.value = ''
  y.value = ''

  console.log(x.value, y.value)
}
</script>
<template>
  <VScaleScreen height="1080" width="1920">
    <div class="all-charts">
      <!-- 园区概况 -->
      <div class="section-one">
        <img
          class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E6%A6%82%E5%86%B5%402x.png"
          alt=""
        />
        <div class="icons-container">
          <div class="item">
            <div class="icons-item building-icon">
              <span class="number">
                {{ parkInfo.base?.buildingTotal }}
              </span>
            </div>
            <span class="title">楼宇总数</span>
            <span class="unity">（栋）</span>
          </div>
          <div class="item">
            <div class="icons-item enterprise-icon">
              <span class="number">
                {{ parkInfo.base?.enterpriseTotal }}
              </span>
            </div>
            <span class="title">入驻企业总数</span>
            <span class="unity">（家）</span>
          </div>
          <div class="item">
            <div class="icons-item car-icon">
              <span class="number">
                {{ parkInfo.base?.parkingTotal }}
              </span>
            </div>
            <span class="title">车位总数</span>
            <span class="unity">（个）</span>
          </div>
          <div class="item">
            <div class="icons-item rod-icon">
              <span class="number">
                {{ parkInfo.base?.chargePoleTotal }}
              </span>
            </div>
            <span class="title">一体杆总数</span>
            <span class="unity">（个）</span>
          </div>
        </div>
      </div>
      <!-- 园区年度收入分析 -->
      <div class="section-two">
        <img
          class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
          alt=""
        />
        <div class="bar-chart-title">
          <span>单位：元</span>
          <div>
            <span class="bar-icon blue-bar-icon"></span>
            <span class="bar-icon red-bar-icon"></span>
            收入情况
          </div>
        </div>
        <div id="barChart" class="bar-chart">123</div>
      </div>
      <!-- 园区产业分布 -->
      <div class="section-three">
        <img
          alt="logo"
          class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E4%BA%A7%E4%B8%9A%E5%88%86%E5%B8%83%402x.png"
        />
        <div id="pieChart" class="pie-chart">123</div>
      </div>
    </div>
    <div class="model-container">
      <LoadingComponent :loading="loadStatus"></LoadingComponent>
      <!-- 准备3D渲染节点 -->
      <canvas ref="ref3d" class="canvas-3d"></canvas>
      <div
        v-if="modelStatus"
        id="t"
        :class="{ animate__zoomIn: modelStatus }"
        :style="{ left: x + 'px', top: y + 'px' }"
        class="tip animate__animated"
      >
        <span class="close" @mousedown.stop="close"></span>
        <div class="header">
          <span v-if="buildingInfo">{{ buildingInfo.name }}</span>
          <span v-else>{{ areaInfo.areaName }}</span>
        </div>
        <div class="content" v-if="buildingInfo">
          <span class="content-left">
            <span>楼层数：{{ buildingInfo.name }}</span>
          </span>
          <span class="content-left">
            <span class="status" v-if="buildingInfo.status == 0">空置中</span>
            <span class="status" v-else>已出租</span>
          </span>
        </div>
        <div class="content" v-else>
          <span class="content-left">
            <span>空闲车位{{ areaInfo.remainSpaceNum }}</span>
          </span>
          <span class="content-left"> 占用率:{{ areaInfo.spaceProportion }} </span>
        </div>
        <div class="content-left">
          <span v-if="buildingInfo">总面积(㎡)：{{ buildingInfo.area }}</span>
          <span v-else>占用车位：{{ areaInfo.occupancySpaceNum }}</span>
        </div>
        <div class="content">
          <span class="content-left" v-if="buildingInfo">
            承租单位：
            <span v-if="buildingInfo.rentEnterpriseName">{{
              buildingInfo.rentEnterpriseName
            }}</span>
            <span v-else>暂无</span>
          </span>
          <span class="content-left" v-else> 停车位数：{{ areaInfo.totalSpaceNum }} </span>
        </div>
        <div class="content-left" v-if="areaInfo">面积(㎡)：{{ areaInfo.areaProportion }}</div>
      </div>
    </div>
  </VScaleScreen>
</template>

<style lang="scss" scoped>
.all-charts {
  position: absolute;
  top: 0;
  left: 0;
  width: 480px;
  height: 100%;
  padding: 88px 20px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(
    to left,
    rgba(0, 6, 15, 0) 0%,
    rgba(0, 6, 15, 0) 20%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(1, 4, 11, 1) 70%,
    #04070d 100%
  );
  color: #fff;

  .img-header {
    height: 30px;
  }
}

.section-one {
  flex-basis: 25%;
  .icons-container {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    .item {
      text-align: center;
      display: flex;
      flex-direction: column;
      flex: 1;

      .icons-item {
        height: 80px;
        position: relative;

        .number {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          font-family: FontquanXinYiGuanHeiTi, FontquanXinYiGuanHeiTi-Regular;
          color: #ffffff;
        }
      }

      .building-icon {
        background: url('@/assets/building-icon.png') no-repeat 50% 0 / contain;
      }

      .enterprise-icon {
        background: url('@/assets/enterprise-icon.png') no-repeat 50% 0 / contain;
      }

      .rod-icon {
        background: url('@/assets/rod-icon.png') no-repeat 50% 0 / contain;
      }

      .car-icon {
        background: url('@/assets/car-icon.png') no-repeat 50% 0 / contain;
      }

      .title,
      .unity {
        font-size: 14px;
        color: #cdd7e1;
      }

      .title {
        margin-top: 8px;
      }
    }
  }
}

.section-two {
  flex-basis: 35%;

  .bar-chart-title {
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;

    .bar-icon {
      width: 30px;
      height: 10px;
      background: red;
      display: inline-block;
    }
    .blue-bar-icon {
      background: linear-gradient(90deg, #74c0f8, rgba(116, 192, 248, 0));
    }

    .red-bar-icon {
      background: linear-gradient(90deg, #ff7152, rgba(255, 113, 82, 0));
    }
  }

  .bar-chart {
    height: calc(100% - 60px);
  }
}

.section-three {
  flex-basis: 35%;

  .pie-chart {
    height: calc(100% - 30px);
    margin: 0 auto;
    padding-bottom: 20px;
    width: 80%;
  }
}

.model-container {
  width: 100%;
  height: 100%;
  background: black;

  .tip {
    width: 281px;
    background: url('@/assets/modal-bg.png') no-repeat;
    background-size: cover;
    padding: 15px;
    color: #fff;
    //display: none;
    position: absolute;
    //left: 0;
    //top: 0;
    .status {
      border: 2.5px solid #075463;
      padding: 3px 5px;
    }
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 20px;
      height: 20px;
      background: url('@/assets/modal-close.png') no-repeat;
      background-size: cover;
      cursor: pointer;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .content-left {
      margin: 6px 0;
    }
  }
}
</style>
