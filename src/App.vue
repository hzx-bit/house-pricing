<script setup>
import { ref } from 'vue'
import { House, DataAnalysis } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCollapse = ref(false)

const handleMenuSelect = (index) => {
  if (index === '1') {
    router.push('/evaluation')
  } else if (index === '2') {
    router.push('/analysis')
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-menu
        default-active="1"
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleMenuSelect"
      >
        <el-menu-item index="1">
          <el-icon><House /></el-icon>
          <span>房价评估</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><DataAnalysis /></el-icon>
          <span>房价可视化分析</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header>
        <h2>房屋价格评估系统</h2>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

.el-aside {
  background-color: #545c64;
  height: 100vh;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 20px;
  margin: 0;
}

.el-main {
  background-color: #f5f7fa;
  padding: 20px;
  height: calc(100vh - 60px);
  margin: 0;
}

.content-placeholder {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #909399;
  height: 100%;
}

:deep(.el-menu) {
  border-right: none;
}

:deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
}
</style>
