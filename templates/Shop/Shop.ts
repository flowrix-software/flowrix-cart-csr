import { defineComponent,defineAsyncComponent, ref } from 'vue';
import { useShopStore } from '../../stores/ShopStore';

export default defineComponent({
  name: 'ShopScript',  
  props: {
    template: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const shop =ref('')
    const AllShop =ref('')
    if(useShopStore().shop){

      shop.value = useShopStore().shop;
    }
    if(useShopStore().AllShop){

      AllShop.value = useShopStore().AllShop;
    }
    
    const ShopTemplate = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import('@/components/template_01/Shop/Shop.vue');
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import('@/components/template_01/Shop/Shop.vue');
        }
      },
    });
    
    const InnerBanner = defineAsyncComponent(() =>
      import('@/components/InnerBanner.vue')
    )

    const Pagination = defineAsyncComponent(() =>
      import('@/components/Others/Pagination.vue')
    )

    const ProductCard = defineAsyncComponent(() =>
      import('@/components/Product/ProductCard.vue')
    )

    const CheckProducts = (category: string, productsList: any[]) => {
      return productsList
            .filter((el) => category === el.category && el.type === 'custom')
            .slice(0, 4);
    };
    return {
      shop,
      AllShop,
      ShopTemplate,
      InnerBanner,
      ProductCard,
      CheckProducts
    };
  },
});