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
        v-for="trip in data"
        :key="trip.id"
      >
        <td class="text-center">{{ trip?.pickup_place.name }}</td>
        <td class="text-center">{{ trip?.dropoff_place.name }}</td>
        <td class="text-center">{{ trip?.passenger?.user?.name }}</td>
        <td class="text-center">{{ trip?.driver?.user?.name }}</td>
        <td class="text-center">{{ trip?.passenger?.selectedVehicle?.plate_number }}</td>
        <td class="text-center">
          <v-select
            v-model="trip.status"
            :items="statuses"
            item-title="text"
            item-value="value"
            :disabled="true"
          ></v-select>
        </td>
        <td class="text-center">
          <v-btn
            color="primary"
            @click="viewTripStatus(trip)"
          >
            View Status
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>

    <TripProgressMapViewer></TripProgressMapViewer>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/store/app'
import TripProgressMapViewer from "@/components/TripProgressMapViewer.vue";

const store = useAppStore()

const storageUrl = import.meta.env.VITE_STORAGE_URL

const groupBy = [
  {
    key: 'passenger',
    order: 'asc'
  }
]

const headers = [
  { text: 'Pick-Up', value: 'pickup_place.name' },
  { text: 'Drop-Off', value: 'dropoff_place.name' },
  { text: 'Passenger Name', value: 'passenger.user.name' },
  { text: 'Driver Name', value: 'driver.user.name' },
  { text: 'Vehicle', value: 'passenger.selectedVehicle.plate_number' },
  { text: 'Status', value: 'status' },
  { text: 'Actions', value: 'action' },
]

const data = ref<any[]>([] as any[])

const statuses = [
  {
    text: 'Heading to Pickup',
    value: 'accepted',
  },
  {
    text: 'Waiting for Passenger',
    value: 'arrived',
  },
  {
    text: 'Heading to Destination',
    value: 'started',
  },
]

onMounted(() => {
  getTrips()
})

function getTrips() {
  store.axios.post('/getTrips')
    .then((res: any) => {
      const trips = res.data
      console.log(trips)
      data.value = trips
    })
}

function viewTripStatus(trip: any) {
  store.viewingTrip = trip
  store.tripProgressMapViewerOpen = true
}
</script>
