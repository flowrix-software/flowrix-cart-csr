import { defineStore } from 'pinia';
import axiosInstance from '../axios/axios-instance';

interface Pages {
    name: string;
}

interface State {
    error: string | null;
    page: Pages | null;
}

export const usePages = defineStore('Pages', {
    state: (): State => ({
        error: null,
        page: null,
    }),
    actions: {
        async getPage(page: string) {
            try {
                this.error = null;
                // this.page = null;
                const apiUrl = `page/${page}`;
                const response = await axiosInstance.get(apiUrl);
                if (response.status === 200) {
                    this.page = response.data.data // Assuming response.data.data is of type Pages
                }
            } catch (error: any) {
                if (error.response) {
                    this.error = error.response.data;
                }
            }
        },
    },
});
