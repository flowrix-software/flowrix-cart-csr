import { useRoute } from 'vue-router';
import {ref,watch, defineComponent, defineAsyncComponent,computed } from "vue";
import { useProduct } from '../../stores/product';

export default defineComponent({
  name: 'ProductScript',
  setup() {
    const route = useRoute();
    const data =  computed(() => useProduct().data || null);
    const ProductComponent = ref('')
    const scrollToPosition = (top) => {
        setTimeout(function(){
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });  
      },0);
      };
     watch(
      () => route.params.slug, // The route path or any reactive route property
      (newSlug, oldSlud) => {
        const components = import.meta.glob('@/components/template_0*/Product/*Product.vue');
        ProductComponent.value = defineAsyncComponent({
          loader: async () => {
            try {
              // Attempt to dynamically import the specified template component
              // return await import(`/src/components/template_0${data.value.template}/Product/${data.value.type}Product.vue`);


              const path = `/src/components/template_0${data.value.template}/Product/${data.value.type}Product.vue`;  // Use absolute path

              return await components[path]?.();

            } catch (error) {
              // If the specified template fails to load, fall back to SimpleProduct1.vue
              // return import(`/src/components/template_01/Product/${data.value.type}Product.vue`);
              const path = `/src/components/template_01/Product/${data.value.type}Product.vue`;  // Use absolute path
              return await components[path]?.();
            }
          },
        });
        scrollToPosition(0);
      },{ immediate: true })

      
    return {
      data,
      ProductComponent
    };
  },
});