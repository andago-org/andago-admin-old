
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">

      <v-list density="compact" nav>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="Andago Admin" nav>
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
        <v-list-item v-show="drawer == true" active base-color="primary" prepend-icon="mdi-logout" title="Logout"
                 @click="logout"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-cog" title="Settings" value="settings" to="settings"></v-list-item>
        <v-list-item prepend-icon="mdi-car-side" title="Vehicles" value="vehicles" to="vehicles"></v-list-item>
        <v-list-item prepend-icon="mdi-card-account-details-outline" title="Drivers" value="drivers" to="drivers"></v-list-item>
        <v-list-item prepend-icon="mdi-flag-variant" title="Trips" value="trips" to="trips"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-app-bar :elevation="2" dense>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>

      <v-container class="pa-0">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/store/app';
import authing from "@/services/authing";

const store = useAppStore()

const drawer = ref(true)
const rail = ref(true)
const items: any[] = [
  {
    title: 'Home',
    icon: 'mdi-home-city'
  },
  {
    title: 'My Account',
    icon: 'mdi-account'
  },
  {
    title: 'Users',
    icon: 'mdi-account-group-outline'
  },
]

function logout()
{
  store.loginState = null
  authing.logout()
}
</script>
