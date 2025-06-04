<template>
  <div class="price-trend-detail">
    <div class="header">
      <h1>房价趋势分析</h1>
      <el-button @click="goBack" type="primary" plain>返回</el-button>
    </div>
    <PriceTrendChart />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import PriceTrendChart from '../components/PriceTrendChart.vue'

const router = useRouter()

const goBack = () => {
  router.push('/analysis')
}
</script>

<style scoped>
.price-trend-detail {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
}
</style> 