// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from "@/store/app";

const routes = [
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
  {
    path: '/',
    component: () => import('@/layouts/Dashboard.vue'),
    redirect: '/settings',
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
      {
        path: 'drivers',
        name: 'Drivers',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Drivers.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const store = useAppStore();
  return true
  if (!store.loginState)
  {
    return false
  }
})

export default router
