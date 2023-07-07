// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from "@/store/app";

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

router.beforeEach(async (to) => {
  const store = useAppStore();

  if (!store.loginState)
  {
    return false
  }
})

export default router
