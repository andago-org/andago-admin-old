<template>
  <div>
    <v-btn color="primary" @click="authing.login()">Login</v-btn>
    <v-btn color="primary" @click="authing.logout()">Logout</v-btn>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { useAppStore } from "@/store/app";
import authing from '@/services/authing'

const store = useAppStore()

onMounted(async () => {
  // await authing.start()

  console.log(store.loginState)
})
</script>
