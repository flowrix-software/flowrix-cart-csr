// stores/Categories.ts
import { defineStore } from "pinia";
import axiosInstance from "../axios/axios-instance";

interface CategoryState {
  data: Record<string, any>;
  category: Record<string, any>;
  currentPage: number;
  slug: string | null;
  error: string | null;
}

export const useCategories = defineStore("Categories", {
  state: (): CategoryState => ({
    data: {},
    category: {},
    allCategories: {},
    currentPage: 1,
    slug: null,
    error: null
  }),
  actions: {
    async getCategories(slug: string, page: number = (this.currentPage = 1)) {
      try {
        this.slug = slug;
        let tags = "";
        if (slug == "blinds-spare-parts") {
          tags = "&tags=spare-part";
        }
        this.currentPage = page;
        const apiUrl = `categories/${slug}?limit=16&page=${page}${tags}`;
        const response = await axiosInstance.get(apiUrl);

        if (response.status === 200) {
          this.data = response.data;
          this.category = response.data.category;
          this.error = null;
        } else {
          this.data = {};
          this.error = "No data found";
        }
      } catch (error: any) {
        if (error.response) {
          this.error = error.response.data.message || "An error occurred";
          console.error(error.response);
        } else {
          this.error = "An error occurred";
          console.error(error);
        }
        this.data = {};
      }
    },

    async getAllCategories() {
      try {
        const apiUrl = `categories`;
        const response = await axiosInstance.get(apiUrl);

        if (response.status === 200) {
          this.allCategories = response.data;
          this.error = null;
        } else {
          this.allCategories = {};
          this.error = "No data found";
        }
      } catch (error: any) {
        if (error.response) {
          this.error = error.response.data.message || "An error occurred";
          console.error(error.response);
        } else {
          this.error = "An error occurred";
          console.error(error);
        }
        this.allCategories = {};
      }
    }
  }
});
