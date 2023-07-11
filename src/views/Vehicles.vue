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
        v-for="vehicle in data"
        :key="vehicle.name"
      >
        <td class="text-center">{{ vehicle?.plate_number }}</td>
        <td class="text-center">{{ vehicle?.passenger.user.name }}</td>
        <td class="text-center">
          <v-img
            class="bg-white"
            height="100"
            :aspect-ratio="1"
            :src="storageUrl + '/vehicles/' + vehicle?.vehicle_photo"
          ></v-img>
        </td>
        <td class="text-center">
          <v-select
            v-model="vehicle.status"
            :items="vehicleStatuses"
            item-title="text"
            item-value="value"
            @update:model-value="updateVehicle(vehicle)"
          ></v-select>
        </td>
      </tr>
      </tbody>
    </v-table>

    <v-overlay
      activator="parent"
      location-strategy="connected"
      scroll-strategy="none"
    >
      <v-card class="pa-2">
        Hello!
      </v-card>
    </v-overlay>
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
  { text: 'Car Number', value: 'plate_number' },
  { text: 'Passenger', value: 'passenger.user.name' },
  { text: 'Car Photo', value: 'vehicle_photo' },
  { text: 'Status', value: 'status' },
  // { text: 'Actions', value: 'action' },
]

const data = ref<any[]>([] as any[])

const vehicleStatuses = [
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
  getVehicles()
})

function getVehicles() {
  store.axios.post('/getVehicles')
    .then((res: any) => {
      const vehicles = res.data

      console.log(vehicles)
      data.value = vehicles
    })
}

function updateVehicle(vehicle: any) {
  console.log(vehicle)
  store.axios.post('/updateVehicle', {
    vehicleId: vehicle.id,
    status: vehicle.status
  })
    .then((res: any) => {
      console.log(res.data)
      getVehicles()
    })
}

</script>
