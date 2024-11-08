import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance' // Adjust the import path accordingly

interface CountryData {
    countries: any[];
    errorResponseData: any[];
}

export const useCountryStore = defineStore('Country', {
    state: (): CountryData => ({
        countries: [],
        errorResponseData: []
    }),

    actions: {
        async getCountries() {
            try {
                const apiUrl = `countries`
                const response = await axiosInstance.get(apiUrl)
                this.countries = response.data.data
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },
    },
    persist: {
        key: 'Country'
    }
})
