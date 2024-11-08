import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance'

export const useGalleryStore = defineStore('GalleryStore', {
  state: () => ({
    tags: [],
    albums: []
  }),
  actions: {
    async getData() {
      try {
        const apiUrl = `albums`
        const response = await axiosInstance.get(apiUrl)
        this.tags = response.data.data.tags
        this.albums = response.data.data.albums
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
})