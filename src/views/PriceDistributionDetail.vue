<template>
  <div class="price-distribution-detail">
    <div class="header">
      <h1>区域房价分布</h1>
      <el-button @click="goBack" type="primary" plain>返回</el-button>
    </div>
    <PriceDistributionMap />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import PriceDistributionMap from '../components/PriceDistributionMap.vue'

const router = useRouter()

const goBack = () => {
  router.push('/analysis')
}
</script>

<style scoped>
.price-distribution-detail {
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