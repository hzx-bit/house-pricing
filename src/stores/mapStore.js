import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('map', () => {
  const mapData = ref({})
  const loading = ref(false)
  const error = ref(null)

  const fetchMapData = async (adcode) => {
    if (mapData.value[adcode]) {
      return mapData.value[adcode]
    }

    loading.value = true
    error.value = null

    try {
      const response = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`)
      if (!response.ok) {
        throw new Error('获取地图数据失败')
      }
      const data = await response.json()
      mapData.value[adcode] = data
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    mapData,
    loading,
    error,
    fetchMapData
  }
}) 