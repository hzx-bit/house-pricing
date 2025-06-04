<template>
  <div class="house-analysis">
    <h1>房价可视化分析</h1>
    <div class="analysis-container">
      <div class="chart-section" @click="navigateToTrend">
        <h2>房价趋势分析</h2>
        <div class="chart-placeholder">
          点击查看详细趋势分析
        </div>
      </div>
      
      <div class="chart-section" @click="navigateToDistribution">
        <h2>区域房价分布</h2>
        <div class="chart-placeholder">
          点击查看区域房价分布
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToTrend = () => {
  router.push('/analysis/trend')
}

const navigateToDistribution = () => {
  router.push('/analysis/distribution')
}
</script>

<style scoped>
.house-analysis {
  padding: 20px;
}

.analysis-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.chart-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.chart-section:hover {
  transform: translateY(-5px);
}

.chart-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #303133;
  font-size: 18px;
}

.chart-placeholder {
  height: 300px;
  background-color: #f5f7fa;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 16px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .analysis-container {
    grid-template-columns: 1fr;
  }
}
</style> 