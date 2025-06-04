<template>
  <div class="evaluation-result-detail">
    <div class="result-header">
      <h1>房屋评估结果</h1>
      <el-button @click="goBack" type="primary" plain>返回评估</el-button>
    </div>

    <!-- 目标房屋信息 -->
    <div class="section target-house">
      <h2>目标房屋信息</h2>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="地区">{{ getCityLabel(houseInfo.region) }}</el-descriptions-item>
        <el-descriptions-item label="区域">{{ getDistrictLabel(houseInfo.district) }}</el-descriptions-item>
        <el-descriptions-item label="户型">{{ houseInfo.layout }}</el-descriptions-item>
        <el-descriptions-item label="面积">{{ houseInfo.area }}平方米</el-descriptions-item>
        <el-descriptions-item label="朝向">{{ houseInfo.orientation }}</el-descriptions-item>
        <el-descriptions-item label="装修">{{ houseInfo.decoration }}</el-descriptions-item>
        <el-descriptions-item label="楼层">{{ houseInfo.floor }}/{{ houseInfo.totalFloors }}层</el-descriptions-item>
        <el-descriptions-item label="建成年份">{{ houseInfo.year }}年</el-descriptions-item>
        <el-descriptions-item label="建筑结构">{{ houseInfo.structure }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 评估结果 -->
    <div class="section evaluation-result">
      <h2>评估结果</h2>
      <div class="price-range">
        <div class="total-price">
          <h3>总价范围</h3>
          <div class="price-value">{{ evaluationResult.totalPriceRange }}</div>
        </div>
        <div class="unit-price">
          <h3>单价范围</h3>
          <div class="price-value">{{ evaluationResult.unitPriceRange }}</div>
        </div>
      </div>
      <div class="evaluation-note">
        <p>注：以上价格仅供参考，实际成交价格可能因市场波动、房屋具体情况等因素而有所变化。</p>
      </div>
    </div>

    <!-- 相似房源 -->
    <div class="section similar-houses">
      <h2>相似房源参考</h2>
      <el-table :data="similarHouses" style="width: 100%">
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="area" label="面积" width="100">
          <template #default="scope">
            {{ scope.row.area }}㎡
          </template>
        </el-table-column>
        <el-table-column prop="layout" label="户型" width="100" />
        <el-table-column prop="floor" label="楼层" width="100" />
        <el-table-column prop="price" label="总价" width="120">
          <template #default="scope">
            {{ scope.row.price }}万
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" label="单价" width="120">
          <template #default="scope">
            {{ scope.row.unitPrice }}元/㎡
          </template>
        </el-table-column>
        <el-table-column prop="similarity" label="相似度" width="100">
          <template #default="scope">
            {{ scope.row.similarity }}%
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAllCities, getAllDistrictOfCity } from '@/api/house'

const router = useRouter()
const route = useRoute()

// 城市和区域数据
const cities = ref([])
const districts = ref([])

// 从路由参数中获取数据
const houseInfo = ref({
  region: route.query.region || '',
  district: route.query.district || '',
  layout: route.query.layout || '',
  area: route.query.area || '',
  orientation: route.query.orientation || '',
  decoration: route.query.decoration || '',
  floor: route.query.floor || '',
  totalFloors: route.query.totalFloors || '',
  year: route.query.year || '',
  structure: route.query.structure || ''
})

const evaluationResult = ref({
  totalPriceRange: route.query.totalPriceRange || '',
  unitPriceRange: route.query.unitPriceRange || ''
})

const similarHouses = ref([])

// 获取城市和区域数据
const fetchData = async () => {
  try {
    const citiesResponse = await getAllCities()
    if (citiesResponse.data && Array.isArray(citiesResponse.data)) {
      cities.value = citiesResponse.data
    }

    if (houseInfo.value.region) {
      const districtsResponse = await getAllDistrictOfCity(houseInfo.value.region)
      if (districtsResponse.data && Array.isArray(districtsResponse.data)) {
        districts.value = districtsResponse.data
      }
    }

    // 解析相似房源数据
    if (route.query.similarHouses) {
      try {
        similarHouses.value = JSON.parse(route.query.similarHouses)
      } catch (error) {
        console.error('解析相似房源数据失败:', error)
      }
    }
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

// 获取城市名称
const getCityLabel = (value) => {
  const city = cities.value.find(c => c.value === value)
  return city ? city.label : value
}

// 获取区域名称
const getDistrictLabel = (value) => {
  const district = districts.value.find(d => d.value === value)
  return district ? district.label : value
}

const goBack = () => {
  router.push('/evaluation')
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.evaluation-result-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.price-range {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
}

.total-price, .unit-price {
  text-align: center;
}

.price-value {
  font-size: 24px;
  color: #409EFF;
  font-weight: bold;
  margin-top: 10px;
}

.evaluation-note {
  color: #666;
  font-size: 14px;
  margin-top: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #303133;
}

h3 {
  color: #606266;
  margin-bottom: 10px;
}
</style> 