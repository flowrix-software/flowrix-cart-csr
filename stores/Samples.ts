import { defineStore } from 'pinia';
import axiosInstance from '../axios/axios-instance';

export const useSamples = defineStore('Samples', {
  state: () => ({
    data: {}, 
    filters: {}, 
  }),
  actions: {
    async getSamples(page = 1, filters = {}) {
      try {
        this.filters = filters;
        
        const filterParams = new URLSearchParams(this.filters).toString();
        const apiUrl = `samples?${filterParams}&page=${page}`;
        const response = await axiosInstance.get(apiUrl);
        
        if (response.status === 200) {
          this.data = response.data.data;
        } else {
          this.data = {}; 
        }
      } catch (error) {
        console.error('Error fetching sample products:', error);
        this.data = {};
      }
    },
  },
});
