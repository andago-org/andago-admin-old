// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/auth/Login.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/Dashboard.vue'),
    redirect: '/dashboard/settings',
    children: [
      {
        path: 'settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Settings.vue'),
      },
      {
        path: 'vehicles',
        name: 'Vehicles',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Vehicles.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
