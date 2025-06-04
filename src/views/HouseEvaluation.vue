<template>
  <div class="house-evaluation">
    <form @submit.prevent="handleSubmit" class="evaluation-form">
      <div class="form-group">
        <label for="region">地区</label>
        <el-select
          v-model="formData.region"
          placeholder="请选择地区"
          @change="handleRegionChange"
          required
        >
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="form-group">
        <label for="district">区域</label>
        <el-select
          v-model="formData.district"
          placeholder="请选择区域"
          :disabled="!formData.region"
          required
        >
          <el-option
            v-for="item in districts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="form-group">
        <label for="layout">户型</label>
        <el-select v-model="formData.layout" placeholder="请选择户型" required>
          <el-option
            v-for="item in layouts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="form-group">
        <label for="area">面积（平方米）</label>
        <el-input-number
          v-model="formData.area"
          :min="1"
          :max="1000"
          required
        />
      </div>

      <div class="form-group">
        <label for="orientation">朝向</label>
        <el-select v-model="formData.orientation" placeholder="请选择朝向" required>
          <el-option value="东" label="东" />
          <el-option value="南" label="南" />
          <el-option value="西" label="西" />
          <el-option value="北" label="北" />
          <el-option value="东南" label="东南" />
          <el-option value="东北" label="东北" />
          <el-option value="西南" label="西南" />
          <el-option value="西北" label="西北" />
        </el-select>
      </div>

      <div class="form-group">
        <label for="decoration">装修风格</label>
        <el-select v-model="formData.decoration" placeholder="请选择装修风格">
          <el-option value="精装" label="精装" />
          <el-option value="简装" label="简装" />
          <el-option value="毛坯" label="毛坯" />
        </el-select>
      </div>

      <div class="form-group">
        <label for="floor">所在楼层</label>
        <el-input-number
          v-model="formData.floor"
          :min="1"
          :max="formData.totalFloors"
          required
        />
      </div>

      <div class="form-group">
        <label for="totalFloors">总楼层</label>
        <el-input-number
          v-model="formData.totalFloors"
          :min="1"
          :max="100"
          required
        />
      </div>

      <div class="form-group">
        <label for="year">建成年份</label>
        <el-input-number
          v-model="formData.year"
          :min="1980"
          :max="currentYear"
          required
        />
      </div>

      <div class="form-group">
        <label for="structure">建筑结构</label>
        <el-select v-model="formData.structure" placeholder="请选择建筑结构" required>
          <el-option value="砖混" label="砖混" />
          <el-option value="框架" label="框架" />
          <el-option value="钢混" label="钢混" />
          <el-option value="其他" label="其他" />
        </el-select>
      </div>

      <el-button type="primary" native-type="submit" class="submit-btn">开始评估</el-button>
    </form>

    <div v-if="showResult" class="evaluation-result">
      <h2>评估结果</h2>
      <div class="result-placeholder">
        评估结果将在这里显示
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getAllCities, getAllDistrictOfCity, evaluateHouse } from '@/api/house'

const router = useRouter()
const currentYear = new Date().getFullYear()

// 城市和区域数据
const cities = ref([])
const districts = ref([])

// 户型选项
const layouts = [
  { value: '1室0厅', label: '1室0厅' },
  { value: '1室1厅', label: '1室1厅' },
  { value: '2室1厅', label: '2室1厅' },
  { value: '2室2厅', label: '2室2厅' },
  { value: '3室1厅', label: '3室1厅' },
  { value: '3室2厅', label: '3室2厅' },
  { value: '4室1厅', label: '4室1厅' },
  { value: '4室2厅', label: '4室2厅' }
]

const formData = reactive({
  region: '',
  district: '',
  layout: '',
  area: 80,
  orientation: '',
  decoration: '',
  floor: 1,
  totalFloors: 18,
  year: currentYear,
  structure: ''
})

// 获取所有城市
const fetchCities = async () => {
  try {
    const response = await getAllCities()
    if (response.data && Array.isArray(response.data)) {
      cities.value = response.data
    } else {
      ElMessage.error('城市数据格式错误')
    }
  } catch (error) {
    console.error('获取城市列表失败:', error)
    ElMessage.error('获取城市列表失败')
  }
}

// 获取区域列表
const handleRegionChange = async () => {
  formData.district = ''
  if (!formData.region) return
  
  try {
    const response = await getAllDistrictOfCity(formData.region)
    if (response.data && Array.isArray(response.data)) {
      districts.value = response.data
    } else {
      ElMessage.error('区域数据格式错误')
    }
  } catch (error) {
    console.error('获取区域列表失败:', error)
    ElMessage.error('获取区域列表失败')
  }
}

// 提交评估
const handleSubmit = async () => {
  try {
    const response = await evaluateHouse(formData)
    if (response.data) {
      router.push({
        path: '/house-evaluation-result',
        query: {
          ...formData,
          totalPriceRange: response.data.totalPriceRange,
          unitPriceRange: response.data.unitPriceRange,
          similarHouses: JSON.stringify(response.data.similarHouses)
        }
      })
    } else {
      ElMessage.error('评估数据格式错误')
    }
  } catch (error) {
    console.error('评估请求失败:', error)
    ElMessage.error('评估请求失败')
  }
}

onMounted(() => {
  fetchCities()
})
</script>

<style scoped>
.house-evaluation {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.evaluation-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

.submit-btn {
  grid-column: 1 / -1;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
}

:deep(.el-input-number) {
  width: 100%;
}

:deep(.el-select) {
  width: 100%;
}

.evaluation-result {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.result-placeholder {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
  text-align: center;
  color: #666;
}
</style> 