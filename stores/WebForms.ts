import { defineStore } from 'pinia';
import axiosInstance from '../axios/axios-instance';

export const useWebForms = defineStore('Webform', {
  state: () => ({
    webform: '',
    webFormReturn: {}
  }),
  actions: {
    async getwebform(id) {
      try {
        var webforms = {}
        if (localStorage.getItem('webforms')) {
          webforms = JSON.parse(localStorage.getItem('webforms'))
        }
        if (webforms[id]) {
          this.webform = webforms[id]
        } else {
          const apiUrl = `contact-center/webforms/${id}/details`
          const response = await axiosInstance.get(apiUrl, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          if (response.status === 200) {
            webforms[response.data.data.id] = response.data.data
            localStorage.setItem('webforms', JSON.stringify(webforms))

            this.webform = response.data.data
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async submitInqury(data,recaptchaToken='') {
      try {
        // if(captchaResponse.data.success==true){
          data.recaptcha = recaptchaToken;

     
          const apiUrl = `contact-center/webforms/create`
          const response = await axiosInstance.post(apiUrl, data, {
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (response.status == 200) {
            
            this.webFormReturn = response.data
          }
        
      } catch (error) {
        this.webFormReturn = error
        console.error('Error fetching data:', error)
      }
    }
  }
})