<template>
  <v-app>
    <v-table>
      <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index" class="text-center">
          {{ header.text }}
        </th>
      </tr>
      </thead>

      <tbody>
      <tr
        v-for="driver in data"
        :key="driver.id"
      >
        <td class="text-center">{{ driver?.user.name }}</td>
        <td class="text-center">
          <v-img
            class="bg-white"
            height="100"
            :aspect-ratio="1"
            :src="storageUrl + '/driver_photos/' + driver?.profile_photo"
          ></v-img>
        </td>
        <td class="text-center">{{ driver?.license_number }}</td>
        <td class="text-center">
          <v-img
            class="bg-white"
            height="100"
            :aspect-ratio="1"
            :src="storageUrl + '/license_photos/' + driver?.license_photo"
          ></v-img>
        </td>
        <td class="text-center">
          <v-select
            v-model="driver.status"
            :items="statuses"
            item-title="text"
            item-value="value"
            @update:model-value="updateDriver(driver)"
          ></v-select>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/store/app'

const store = useAppStore()

const storageUrl = import.meta.env.VITE_STORAGE_URL

const groupBy = [
  {
    key: 'passenger',
    order: 'asc'
  }
]

const headers = [
  { text: 'Driver Name', value: 'user.name' },
  { text: 'Profile Photo', value: 'profile_photo' },
  { text: 'License Number', value: 'license_number' },
  { text: 'License Photo', value: 'license_photo' },
  { text: 'Status', value: 'status' },
  // { text: 'Actions', value: 'action' },
]

const data = ref<any[]>([] as any[])

const statuses = [
  {
    text: 'Pending',
    value: 'pending',
  },
  {
    text: 'Verified',
    value: 'verified',
  },
  {
    text: 'Rejected',
    value: 'rejected',
  },
]

onMounted(() => {
  getDrivers()
})

function getDrivers() {
  store.axios.post('/getDrivers')
    .then((res: any) => {
      const drivers = res.data

      data.value = drivers
    })
}

function updateDriver(driver: any) {
  store.axios.post('/updateDriver', {
    driverId: driver.id,
    status: driver.status,
  })
    .then((res: any) => {
      console.log(res.data)
      getDrivers()
    })
}

</script>
