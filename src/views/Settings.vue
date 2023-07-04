<template>
  <v-app>
    <v-container class="d-flex justify-center">
      <div style="width: 200px;">
        <v-form v-model="valid">
          <v-text-field label="Min Topup Amount" model-value="2.00" prefix="RM" validate-on="input"></v-text-field>
          <v-text-field label="Min Fare" model-value="5.00" prefix="RM"></v-text-field>
          <v-text-field label="Distance Add-on (per km)" model-value="2.00" suffix="km"></v-text-field>
          <v-text-field label="Search drivers from range (km)" model-value="2.00" suffix="km"></v-text-field>
          <v-text-field label="Search drivers to range (km)" model-value="2.00" suffix="km"></v-text-field>
          <v-text-field label="Range increase interval (sec)" model-value="2.00" suffix="sec"></v-text-field>
          <v-text-field label="Free Wait Time (min)" model-value="2.00" suffix="min"></v-text-field>
        </v-form>
      </div>
    </v-container>
    <v-container class="d-flex align-end flex-column position-fixed pa-5" style="width: 160px;right: 0px">
      <v-btn block prepend-icon="mdi-check-circle" class="ma-2" color="primary">Update</v-btn>
      <v-btn block prepend-icon="mdi-check-circle" class="ma-2" color="secondary">Cancel</v-btn>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const valid = ref(true)

function aa(event: any) {
  console.log(event)
}
</script>
