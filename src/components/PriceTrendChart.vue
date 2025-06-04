<template>
  <div class="price-trend-chart">
    <div class="filter-section">
      <el-select v-model="selectedRegion" placeholder="选择地区" @change="handleRegionChange">
        <el-option
          v-for="item in regions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      
      <el-select v-model="selectedDistrict" placeholder="选择区域" @change="updateChart">
        <el-option
          v-for="item in districts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <div v-loading="loading" ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import { getAllCities, getAllDistrictOfCity, getPriceTrend } from '@/api/house'

const chartRef = ref(null)
let chart = null
const loading = ref(false)

// 城市和区域数据
const regions = ref([])
const districts = ref([])

const selectedRegion = ref('beijing')
const selectedDistrict = ref('chaoyang')

// 获取城市和区域数据
const fetchData = async () => {
  try {
    const citiesResponse = await getAllCities()
    if (citiesResponse.data && Array.isArray(citiesResponse.data)) {
      regions.value = citiesResponse.data
    } else {
      ElMessage.error('城市数据格式错误')
    }

    if (selectedRegion.value) {
      const districtsResponse = await getAllDistrictOfCity(selectedRegion.value)
      if (districtsResponse.data && Array.isArray(districtsResponse.data)) {
        districts.value = districtsResponse.data
      } else {
        ElMessage.error('区域数据格式错误')
      }
    }
  } catch (error) {
    console.error('获取数据失败:', error)
    ElMessage.error('获取数据失败')
  }
}

const handleRegionChange = async () => {
  try {
    const response = await getAllDistrictOfCity(selectedRegion.value)
    if (response.data && Array.isArray(response.data)) {
      districts.value = response.data
      selectedDistrict.value = districts.value[0]?.value
      updateChart()
    } else {
      ElMessage.error('区域数据格式错误')
    }
  } catch (error) {
    console.error('获取区域数据失败:', error)
    ElMessage.error('获取区域数据失败')
  }
}

const initChart = () => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    updateChart()
  }
}

const updateChart = async () => {
  if (!chart) return

  try {
    loading.value = true
    const response = await getPriceTrend(selectedRegion.value, selectedDistrict.value)
    if (response.data && response.data.dates && response.data.prices) {
      const data = response.data
      
      const option = {
        title: {
          text: '房价趋势分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br />单价：{c} 元/㎡'
        },
        xAxis: {
          type: 'category',
          data: data.dates,
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: '单价（元/㎡）',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '平均单价',
            type: 'line',
            data: data.prices,
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: '最高价' },
                { type: 'min', name: '最低价' }
              ]
            },
            areaStyle: {
              opacity: 0.1
            }
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        }
      }

      chart.setOption(option)
    } else {
      ElMessage.error('趋势数据格式错误')
    }
  } catch (error) {
    console.error('获取趋势数据失败:', error)
    ElMessage.error('获取趋势数据失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
  initChart()
  window.addEventListener('resize', () => {
    chart?.resize()
  })
})

watch([selectedRegion, selectedDistrict], () => {
  updateChart()
})
</script>

<style scoped>
.price-trend-chart {
  padding: 20px;
}

.filter-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-container {
  height: 500px;
  width: 100%;
}
</style> 