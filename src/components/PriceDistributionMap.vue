<template>
  <div class="price-distribution-map">
    <div class="filter-section">
      <el-select v-model="selectedCity" placeholder="选择城市" @change="handleCityChange">
        <el-option
          v-for="item in cities"
          :key="item.adcode"
          :label="item.label"
          :value="item.adcode"
        />
      </el-select>
    </div>

    <div v-loading="loading" class="map-container">
      <div ref="mapRef" class="map-content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import { useMapStore } from '@/stores/mapStore'
import { getAllCities, getPriceDistribution } from '@/api/house'

const mapRef = ref(null)
let chart = null
const mapStore = useMapStore()
const loading = ref(false)

// 城市列表
const cities = ref([])
const selectedCity = ref('110000') // 默认选择北京

// 获取城市列表
const fetchCities = async () => {
  try {
    const response = await getAllCities()
    if (response.data && Array.isArray(response.data)) {
      cities.value = response.data
    } else {
      ElMessage.error('获取城市列表失败')
    }
  } catch (error) {
    console.error('获取城市列表失败:', error)
    ElMessage.error('获取城市列表失败')
  }
}

const handleCityChange = async () => {
  await updateMap()
}

const initMap = async () => {
  try {
    if (mapRef.value) {
      loading.value = true
      
      // 获取地图数据
      const geoJson = await mapStore.fetchMapData(selectedCity.value)
      
      // 注册地图数据
      echarts.registerMap(selectedCity.value, geoJson)
      
      // 初始化图表
      chart = echarts.init(mapRef.value)
      
      // 获取房价分布数据
      const priceResponse = await getPriceDistribution(selectedCity.value)
      const priceData = priceResponse.data.districts
      
      // 设置基础配置
      const option = {
        backgroundColor: '#fff',
        title: {
          text: '区域房价分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br />平均单价：{c} 元/㎡'
        },
        visualMap: {
          min: 40000,
          max: 120000,
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#e0f3f8', '#045a8d']
          }
        },
        series: [
          {
            name: '区域房价',
            type: 'map',
            map: selectedCity.value,
            roam: true,
            emphasis: {
              label: {
                show: true
              }
            },
            data: priceData
          }
        ]
      }

      chart.setOption(option)
    }
  } catch (error) {
    console.error('初始化图表失败:', error)
    ElMessage.error('初始化图表失败，请刷新页面重试')
  } finally {
    loading.value = false
  }
}

const updateMap = async () => {
  if (!chart) return

  try {
    loading.value = true
    
    // 获取新的地图数据
    const geoJson = await mapStore.fetchMapData(selectedCity.value)
    
    // 重新注册地图数据
    echarts.registerMap(selectedCity.value, geoJson)
    
    // 获取房价分布数据
    const priceResponse = await getPriceDistribution(selectedCity.value)
    const priceData = priceResponse.data.districts
    
    // 更新图表
    chart.setOption({
      series: [{
        map: selectedCity.value,
        data: priceData
      }]
    })
  } catch (error) {
    console.error('更新图表失败:', error)
    ElMessage.error('更新图表失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCities()
  initMap()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})

const handleResize = () => {
  chart?.resize()
}

watch(selectedCity, () => {
  updateMap()
})
</script>

<style scoped>
.price-distribution-map {
  padding: 20px;
}

.filter-section {
  margin-bottom: 20px;
}

.map-container {
  height: 600px;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fff;
}

.map-content {
  height: 100%;
  width: 100%;
}
</style> 