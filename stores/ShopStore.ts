import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance';
import { useRoute,useRouter } from 'vue-router';
export const useShopStore = defineStore('ShopStore', {
  state: () => ({
    shop: '',
    AllShop: '',
  }),
  actions: {
    async customProducts(query: object) {
      try {
        const response = await axiosInstance.get(`shop/customproducts`, { params: query })
        if (response.status === 200) {
          this.shop = response.data.data
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async getShop(query) {
      try {
        const response = await axiosInstance.get(`search`, { params: query })
        if (response.status === 200) {
          this.AllShop = response.data.data
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  },
})
