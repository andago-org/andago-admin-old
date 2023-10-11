<template>
  <v-app>
    <v-container class="d-flex justify-center">
      <div style="width: 200px;">
        <v-form v-model="valid">
          <v-text-field label="Min Topup Amount" v-model="config.min_topup_amount" prefix="RM" validate-on="input"></v-text-field>
          <v-text-field label="Min Fare"  v-model="config.min_fare" prefix="RM"></v-text-field>
          <v-text-field label="Distance Add-on (per km)" v-model="config.fare_per_km" suffix="km"></v-text-field>
          <v-text-field label="Duration Add-on (per min)" v-model="config.fare_per_min" suffix="min"></v-text-field>
          <v-text-field label="Search drivers from range (km)" v-model="config.min_range_km" suffix="km"></v-text-field>
          <v-text-field label="Search drivers to range (km)" v-model="config.max_range_km" suffix="km"></v-text-field>
          <v-text-field label="Range increase interval (sec)" v-model="config.range_increase_sec" suffix="sec"></v-text-field>
          <v-text-field label="Free Wait Time (min)" v-model="config.free_wait_min" suffix="min"></v-text-field>
        </v-form>
      </div>
    </v-container>
    <v-container v-if="configChanged" class="d-flex align-end flex-column position-fixed pa-5" style="width: 160px;right: 0px">
      <v-btn block prepend-icon="mdi-check-circle" class="ma-2" color="primary" @click="updateConfig">Update</v-btn>
      <v-btn block prepend-icon="mdi-trash-can-outline" class="ma-2" color="secondary" @click="cancelChange">Cancel</v-btn>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive, computed, watch} from 'vue'
import { useAppStore } from "@/store/app"

const store = useAppStore()

const valid = ref(true)

const originalConfig = reactive({})

const config = reactive({
  min_topup_amount: 0,
  min_fare: 0,
  fare_per_km: 0,
  fare_per_min: 0,
  min_range_km: 0,
  max_range_km: 0,
  range_increase_sec: 0,
  free_wait_min: 0,
})

const configChanged = computed(() => {
  return JSON.stringify(config) !== JSON.stringify(originalConfig)
})

onMounted(() => {
  copyReactive(originalConfig, config)
  getConfig()
})

function getConfig()
{
  store.axios.post('/getConfig')
    .then((res: any) => {
      const configData = res.data

      for (let key in originalConfig) {
        copyReactive(originalConfig, configData)
        copyReactive(config, configData)
      }

      console.log(res)
  })
}

function updateConfig()
{
  store.axios.post('/updateConfig', config)
    .then((res: any) => {
      getConfig()
  })
}

function copyReactive(copyTo: any, copyFrom: any)
{
  for (let key in copyFrom) {
    copyTo[key] = copyFrom[key]
  }
}

function cancelChange()
{
  copyReactive(config, originalConfig)
}
</script>
