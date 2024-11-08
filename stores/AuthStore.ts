//AuthStore.ts

import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance'; // Adjust the import path accordingly
import { ref } from 'vue'
interface User {
    email: string,
    password: string,
}
interface Data {
    access_token: string,
    user: object,
}
export const useAuthStore = defineStore('AuthStore', {
    state: (): any => ({
        user: [],
        responseData: [],
        verifyEmailState: [],
        verifyTokenState: [],
        setNewPasswordState: [],
        changePasswordState: [],
        logoutResponse: [],
        refreshResponse: [],
        errorResponseData: [],
        isAuthenticated: ref(false),
        userInlocalStorage: false,
        access_token: ''
    }),
    actions: {
        resetErrorResponseData() {
            this.errorResponseData = [];
          },
        async addCustomer(user: User) {
            try {
                const apiUrl = `customer/create`
                const response = await axiosInstance.post(apiUrl, user)
                if (response.status === 200) {
                   await this.login({ email: user.email, password: user.password })
                    this.responseData = response.data
                }
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },

        async login(credientials: object) {
            try {
                const apiUrl = `login`
                const response = await axiosInstance.post(apiUrl, credientials)
                if (response.status === 200) {
                    this.user = response.data.data.user
                    this.access_token = response.data.data.access_token
                }              
                this.responseData = response.data
                this.errorResponseData = []
                this.isAuthenticated = true
                this.userInlocalStorage = true
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },

        async verifyEmail(email: object) {
            try {
                const apiUrl = `verify-email`
                const response = await axiosInstance.post(apiUrl, email)
                this.verifyEmailState = response.data
                this.errorResponseData = []
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                    console.error(this.errorResponseData)
                }
            }
        },

        async verifyToken(credientials: object) {
            try {
                const apiUrl = `verify-token`
                const response = await axiosInstance.post(apiUrl, credientials)
                this.verifyTokenState = response.data
                this.errorResponseData = []
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },

        async resetPassword(credientials: object) {
            try {
                const apiUrl = `reset-password`
                const response = await axiosInstance.post(apiUrl, credientials)
                this.setNewPasswordState = response.data
                this.errorResponseData = []
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },

        async changePassword(credientials: object) {
            try {
                this.changePasswordState = ''
                this.errorResponseData = ''
                const accessToken = this.getUserFromlocalStorage()
                const apiUrl = `customer/change-password`
                const response = await axiosInstance.post(
                    apiUrl,
                    credientials,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken
                        }
                    }
                )
                this.changePasswordState = response.data
                this.errorResponseData = []
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },

        async logout() {
            try {
                const access_token = this.getUserFromlocalStorage()
                const apiUrl = `customer/logout`
                const response = await axiosInstance.post(
                    apiUrl,
                    { access_token },
                    {
                        headers: {
                            Authorization: 'Bearer ' + access_token
                        }
                    }
                )
                
                this.logoutResponse = response.data
                this.isAuthenticated = false
                this.access_token = ''
                this.user=[]
                this.deleteSessionFromlocalStorage()
                this.userInlocalStorage = false
            } catch (error: any) {
                // console.log('Error', error)
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },

        async refreshToken() {
            try {
                const accessToken = this.getUserFromlocalStorage()
                const apiUrl = `refresh`
                const response = await axiosInstance.post(
                    apiUrl,
                    { accessToken },
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken
                        }
                    }
                )
                this.refreshResponse = response.data
                this.isAuthenticated = true

                const localStorageObj = {
                    isAuthenticated: this.isAuthenticated,
                    access_token: this.refreshResponse.data.accessToken
                }

                localStorage.setItem('user', JSON.stringify(localStorageObj))
            } catch (error: any) {
                // console.log('Error', error)
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },

        storeUserInlocalStorage(data: Data) {
            const isAuthenticated = this.isAuthenticated
            const localStorageObj = {
                isAuthenticated: isAuthenticated,
                access_token: data.access_token,
                user: data.user
            }
            localStorage.setItem('user', JSON.stringify(localStorageObj))
        },

        getUserFromlocalStorage() {
            const userString = localStorage.getItem('user')
            let user: Data
            if (userString) {
                try {
                    user = JSON.parse(userString)
                    const accessToken = user.access_token
                    return accessToken
                } catch (error) {
                    console.log(error)
                }
            }
        },

        deleteSessionFromlocalStorage() {
            localStorage.removeItem('user')
        }
    },
    persist: {
        key: 'user',
        paths:['user','access_token','isAuthenticated']
    }
})
