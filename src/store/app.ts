// Utilities
import { defineStore } from 'pinia'
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';



export const useAppStore = defineStore('app', {
  state: () => ({
    auth0Client: null as Auth0Client | null,
    test: "",
  }),
  getters: {
    auth0(): Auth0Client {
      return this.auth0Client as Auth0Client
    },
    async authenticated(): Promise<boolean> {
      const isAuthenticated = await this.auth0.isAuthenticated()

      return isAuthenticated
    },
  },
  actions: {
    async createAuth0Client()
    {
      const auth0 = await createAuth0Client({
        domain: "dev-pbt6568epwomuwsa.au.auth0.com",
        clientId: "oibjYkiP3TJsuBWeZ4Rdwfh56yRHZjgI",
        authorizationParams: {
          redirect_uri: import.meta.env.VITE_BASE_URL
        }
      })

      this.auth0Client = auth0
    },
  },
  persist: {
    enabled: true,
  },
})
