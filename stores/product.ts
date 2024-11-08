import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance';
import { useCartStore } from './Cart'

export const useProduct = defineStore('Product', {
  state: () => ({
    data: {},
  }),
  actions: {
    async getProduct(slug,queryperameters='') {
      try {
        let attributes={};
        if(queryperameters.customize){
          const getItem = useCartStore().cart.items[queryperameters.customize].options.ids
          attributes['attribute_id'] = getItem
        }
        console.log('attributes')
        console.log(attributes)
        const apiUrl = `product/${slug}`
          const response = await axiosInstance.post(apiUrl,attributes)
          if (response.status === 200) {
            this.data = response.data.data
          }
      } catch (error: any) {
        if (error.response) {
          this.data = null
          console.log(error.response)
          // Handle error as needed
        }
      }
    },
  }
})
