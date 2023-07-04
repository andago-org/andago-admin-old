<template>
  <v-app>
    <v-data-table-virtual :headers="headers" :items="data" class="elevation-1" height="400"
      item-value="name"></v-data-table-virtual>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'whatwg-fetch'

const groupBy = [
  {
    key: 'passenger',
    order: 'asc'
  }
]

const headers = [
  {
    text: 'Car Number',
    align: 'start',
    sortable: false,
    value: 'name',
  },
  { text: 'Passenger', value: 'passenger' },
  { text: 'Car Photo', value: 'vehicle_photo' },
  { text: 'Status', value: 'status' },
  { text: 'Actions', value: 'action' },
]

const data = [] as any[]

function getVehicles() {
  fetch('http://localhost:3000/vehicles')
    .then((response) => response.json())
    .then((json) => {
      json.forEach((element: any) => {
        data.push({
          name: element.car_number,
          passenger: element.passenger,
          vehicle_photo: element.vehicle_photo,
          status: element.status,
          action: element.action,
        })
      })
    })
}
</script>
