import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 获取所有城市
export const getAllCities = () => {
  return api.get('/getAllCities')
}

// 获取城市下的所有区域
export const getAllDistrictOfCity = (city) => {
  return api.get('/getAllDistrictOfCity')
}

// 房屋评估
export const evaluateHouse = (data) => {
  return api.get('/evaluate', { params: data })
}

// 获取房价趋势数据
export const getPriceTrend = (city, district) => {
  return api.get('/getPriceTrend', {
    params: { city, district }
  })
}

// 获取区域房价分布数据
export const getPriceDistribution = (adcode) => {
  return api.get('/getPriceDistribution')
} 