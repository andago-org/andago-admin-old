<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useAppStore } from './store/app';
import {onMounted} from "vue";
import authing from "@/services/authing";

const store = useAppStore()

// onMounted(async () => {
//   if (import.meta.env.VITE_APP_ENV != "local")
//   {
//     await authing.check()
//   }
//   store.loginState = authing.loginState
// })
</script>
