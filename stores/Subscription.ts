//Subscription.ts

import { defineStore } from 'pinia';
import axiosInstance from '../axios/axios-instance'; // Adjust the path if necessary

interface SubscriptionState {
  responseData: any[];
  errorResponseData: any[];
}

export const useSubscription = defineStore('Subscription', {
  state: (): SubscriptionState => ({
    responseData: [],
    errorResponseData: []
  }),
  actions: {
    async subscribe(email: string): Promise<any> {
      try {
        this.errorResponseData = [];
        this.responseData = [];

        const apiUrl = 'subscribe';
        const response = await axiosInstance.post(apiUrl, { email });

        if (response.status === 200) {
          return response.data; // Return the API response data
        } else {
          // Handle non-200 status codes if necessary
          return { status: 'Error', message: 'Failed to subscribe.' };
        }
      } catch (error: any) {
        if (error.response) {
          return { status: 'Error', message: error.response.data };
        }
        return { status: 'Error', message: 'An unknown error occurred.' };
      }
    }
  }
});
