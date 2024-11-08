import { defineStore } from 'pinia';
import axiosInstance from '../axios/axios-instance';
export const useUserstore = defineStore('Userstore', {
  state: (): UserState => ({
    user: [],
    countries: [],
    order_history: [],
    quotes_history: [],
    new_address: [],
    cards: [],
    taxInvoice: [],
    update_address: [],
    update_profile: [],
    delete_address:[],
    errorResponseData: '',
    access_token: '',
    isAuthenticated:false,
    successResponse: ''
  }),
  actions: {
    resetErrorResponseData() {
      this.errorResponseData = '';
    },

    async fetchUserData() {
      try {
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = 'customer/profile';
        const response = await axiosInstance.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        
          this.access_token= accessToken,
          this.isAuthenticated = true,       
          this.user = response.data.data;
      } catch (error: any) {
        console.log('Error:', error); // Debugging line
        if (error.response) {
          console.log('Error Response:', error.response); // Debugging line
          this.errorResponseData = error.response.data;
        }
      }
    },
    
    async getCountries() {
      try {
        const apiUrl = 'countries';
        const response = await axiosInstance.get(apiUrl);
        this.countries = response.data;
      } catch (error: any) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },

    async getOrderHistory() {
      try {
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = 'customer/orders';
        const response = await axiosInstance.get(apiUrl, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        this.order_history = response.data;
      } catch (error: any) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },

    async getTaxInvoice(orderNo) {
      try {
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = `customer/orders/${orderNo}/tax-invoice`;
        const response = await axiosInstance.get(apiUrl, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          responseType: 'blob',
        });
        console.log(response)
        const file = new Blob([response.data], { type: 'application/pdf' });

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = `Order-${orderNo}.pdf`; // Name of the file to be downloaded

        // Append link to body temporarily and simulate click
        document.body.appendChild(link);
        link.click();

        // Remove the temporary link from the document
        document.body.removeChild(link);

        // this.taxInvoice = response.data;
      } catch (error) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },
    
    async getQuotesHistory() {
      try {
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = 'customer/quotations';
        const response = await axiosInstance.get(apiUrl, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        this.quotes_history = response.data;
      } catch (error: any) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },

    async getquotes() {
      try {
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = 'customer/quotations';
        const response = await axiosInstance.get(apiUrl, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        this.order_history = response.data;
      } catch (error: any) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },

    async addNewAddress(userData: any) {
      try {
        userData.shipping = 1;
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = 'customer/address/add';
        const response = await axiosInstance.post(apiUrl, userData, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        this.new_address = response.data;
        if (this.new_address.status === 'Success') {
          this.fetchUserData()
          this.successResponse = 'New Address Added Successfully';
        }
      } catch (error: any) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },

    async updateAddress(userData: any) {
      try {
        this.successResponse = ''
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = `customer/address/${userData.id}/update`;
        const response = await axiosInstance.patch(apiUrl, userData, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        this.update_address = response.data;
        if (this.update_address.status === 'Success') {
          this.fetchUserData()
          this.successResponse = 'Address Updated Successfully';
          this.errorResponseData = ''
        }
      } catch (error: any) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },

    async deleteAddress(userData: any) {
      try {
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = `customer/address/${userData.id}/delete`
        const response = await axiosInstance.patch(apiUrl, userData, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        this.delete_address = response.data;
        console.log(this.delete_address.status)
        if (this.delete_address.status === 'Success') {
          this.fetchUserData()
          this.successResponse = 'Address Deleted Successfully';
        }
      } catch (error: any) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },

    async updateProfile(userData: any) {
      try {
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = 'customer/profile/update';
        const response = await axiosInstance.post(apiUrl, userData, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        this.update_profile = response.data;
        if (this.update_profile.status === 'Success') {
          this.fetchUserData()
          this.successResponse = 'Profile Updated Successfully';
        }
      } catch (error: any) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },

    async defaultAddress(addressID: string) {
      try {
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = `customer/address/${addressID}/setshipping`;
        const response = await axiosInstance.post(apiUrl, {}, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        this.update_profile = response.data;
        if (this.update_profile.status === 'Success') {
          this.fetchUserData();
          this.successResponse = 'Data Updated Successfully';
        }
      } catch (error: any) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },

    async submitReview(data: any) {
      try {
        const accessToken = this.getAccessTokenFromlocalStorage();
        const response = await axiosInstance.post(
          `products/${data.value.slug}/review/save`,
          {
            rating: data.value.rating,
            subject: data.value.subject,
            review: data.value.review
          },
          {
            headers: {
              Authorization: 'Bearer ' + accessToken
            }
          }
        );
        if (response.status === 200) {
          this.successResponse = response.data.message;
        } else {
          this.errorResponseData = response.data.message;
        }
      } catch (error: any) {
        console.error('Error fetching data:', error);
      }
    },

    async getCustomerCards() {
      try {
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = 'customer/cards';
        const response = await axiosInstance.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.cards = response.data.data;
      } catch (error: any) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },

    async deleteCustomerCard(cardId: string) {
      try {
        const accessToken = this.getAccessTokenFromlocalStorage();
        const apiUrl = `customer/cards/${cardId}`;
        const response = await axiosInstance.delete(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          this.cards = this.cards.filter((card) => card.id !== cardId);
          this.successResponse = 'Card Deleted Successfully';
        }
      } catch (error: any) {
        if (error.response) {
          this.errorResponseData = error.response.data;
        }
      }
    },

    getAccessTokenFromlocalStorage(): string {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.access_token) {
        return user.access_token;
      }
      
      if (user.responseData && user.responseData.data && user.responseData.data.access_token) {
        return user.responseData.data.access_token;
      }
      
      return '';
    }
    
  },
  persist:{
    key:'user',
    paths:['user','access_token','isAuthenticated']
  }
});
