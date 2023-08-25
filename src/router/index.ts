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
        path: '/test',
        name: 'Test',
        component: () => import('@/views/Test.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue'),
      },
      {
        path: 'vehicles',
        name: 'Vehicles',
        component: () => import('@/views/Vehicles.vue'),
      },
      {
        path: 'drivers',
        name: 'Drivers',
        component: () => import('@/views/Drivers.vue'),
      },
      {
        path: 'trips',
        name: 'Trips',
        component: () => import('@/views/Trips.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// router.beforeEach(async (to) => {
//   const store = useAppStore();
//   return true
//   if (!store.loginState)
//   {
//     return false
//   }
// })

export default router
