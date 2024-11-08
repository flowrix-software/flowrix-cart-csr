import { defineComponent,defineAsyncComponent,computed } from 'vue';
import InnerBanner from '@/components/InnerBanner.vue';
import Pagination from '@/components/Others/Pagination.vue';
import ProductCard from '@/components/Product/ProductCard.vue';
import banner from '@/assets/images/banner.webp';
import { useCategories } from '../../stores/Categories';

export default defineComponent({
  name: 'CategoryScript',  
  props: {
    template: {
      type: String,
      required: false
    }
  },
  components: {
    InnerBanner,
    Pagination,
    ProductCard
  },
  setup(props) {
    const Categories =useCategories();
    const CategoryData = computed(() => Categories.data);
    const Products = computed(() => Categories.data.products);    
    const Category = computed(() => Categories.category);


    const CategoryComponent = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import(`/src/components/template_0${Category.template}/Category/Category.vue`);
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import('@/components/template_01/Category/Category.vue');
        }
      },
    });

    const CategoryContent = defineAsyncComponent({
      loader: async () => {
        try {
          return await import(`/src/components/template_0${Category.template}/Category/Content.vue`);
        } catch (error) {          
          return import('@/components/template_01/Category/Content.vue');
        }
      },
    });
    
    

    return {
      CategoryData,
      CategoryComponent,
      CategoryContent,
      Category,
      Products,
      banner
    };
  },
});