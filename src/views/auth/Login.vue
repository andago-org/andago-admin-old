<template>
  <div>
    <v-btn color="primary">Login</v-btn>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import authing from '@/services/authing'


onMounted(async () => {
  await authing.start()
});

</script>
