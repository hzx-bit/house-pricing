import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/evaluation',
      name: 'evaluation',
      component: () => import('../views/HouseEvaluation.vue'),
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: () => import('../views/HouseAnalysis.vue'),
    },
    {
      path: '/analysis/trend',
      name: 'price-trend',
      component: () => import('../views/PriceTrendDetail.vue'),
    },
    {
      path: '/analysis/distribution',
      name: 'price-distribution',
      component: () => import('../views/PriceDistributionDetail.vue'),
    },
    {
      path: '/house-evaluation-result',
      name: 'HouseEvaluationResult',
      component: () => import('@/views/HouseEvaluationResult.vue')
    },
  ],
})

export default router
