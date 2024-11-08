import { useRouter } from 'vue-router'; 
import { defineComponent, defineAsyncComponent,computed } from "vue";
import { useProduct } from '../../stores/product';

export default defineComponent({
  name: 'SimpleProductScript',
  setup() {
    const router = useRouter(); 
    const productData = computed(() => useProduct().data);

    const ProductVariation = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import('@/components/template_01/SimpleProduct/ProductVariation.vue');
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          // return import(`@/components/template_01/Product/${data.type}Product.vue`);
        }
      },
    });

    const Gallery = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import('@/components/template_01/Product/Gallery.vue');
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          // return import('@/components/template_01/Product/${data.type}Product.vue');
        }
      },
    });

    const AddToCard = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import('@/components/template_01/SimpleProduct/AddToCart.vue');
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          // return import(`@/components/template_01/Product/${data.type}Product.vue`);
        }
      },
    });

    const handleVariationChange = async (slug: string) => {
      await useProduct().getProduct(slug);  
      router.push({ name: 'Product', params: { slug } }); 
    };
    return {
      ProductVariation,
      Gallery,
      AddToCard,
      productData,
      handleVariationChange
    };
  },
});