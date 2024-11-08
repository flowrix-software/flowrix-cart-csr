import { defineComponent, defineAsyncComponent } from 'vue'
export default defineComponent({
  name: 'MenuScript',
  setup() {
    const MegaMenu = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import(`@/components/template_01/Menu/MegaMenu.vue`);
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import(`@/components/template_01/Menu/MegaMenu.vue`);
        }
      },
    });

    const wordpressUrl = import.meta.env.VITE_APP_WORDPRESS_URL;


    return {
      wordpressUrl,
      MegaMenu            
    };
  },
});