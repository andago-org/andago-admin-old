// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    test: "",
  }),
  getters: {
    
  },
  actions: {
    
  },
  persist: {
    enabled: true,
  },
})
