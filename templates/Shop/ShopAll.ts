import { ref ,computed,defineAsyncComponent} from 'vue'
import { defineComponent } from 'vue';
import { useShopStore } from '../../stores/ShopStore';

export default defineComponent({
  name: "ShopAllScript",
  props: {
    template: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const shop = computed(() => useShopStore().AllShop);
    const products = computed(() => useShopStore().AllShop.products);
    const pagination = computed(() => useShopStore().AllShop.products.links);
    const currentPage = computed(
      () => useShopStore().AllShop.products.current_page
    );
    const lastPage = computed(() => useShopStore().AllShop.products.last_page);

    const ShopTemplate = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import('@/components/template_01/Shop/ShopAll.vue');
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import('@/components/template_01/Shop/ShopAll.vue');
        }
      }
    });
    const PaginationComponent = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import('@/components/Others/Pagination.vue');
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import('@/components/Others/Pagination.vue');
        }
      },
    });


     const ProductCard = defineAsyncComponent(() =>
      import('@/components/Product/ProductCard.vue')
    )

    const InnerBanner = defineAsyncComponent(
      () => import("@/components/InnerBanner.vue")
    );


    return {
      shop,
      pagination,
      PaginationComponent,
      ProductCard,
      InnerBanner,
      currentPage,
      products,
      lastPage,
      ShopTemplate,
    };
  }
});
