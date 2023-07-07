// Utilities
import { defineStore } from 'pinia'
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL+'/admins',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const useAppStore = defineStore('app', {
  state: () => ({
    loginState: null as any,
  }),
  getters: {
    axios() {
      axiosInstance.defaults.headers['Accept'] = 'application/json'
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${this.loginState.accessToken}`
      axiosInstance.defaults.headers['Id-Token'] = this.loginState.idToken

      return axiosInstance;
    }
  },
  actions: {

  },
  persist: {
    enabled: true,
  },
})
