import { defineComponent,defineAsyncComponent } from 'vue';
import { computed } from 'vue';
import { useCartStore } from '../../stores/Cart'
import { useAuthStore } from "../../stores/AuthStore";
import { useCompanyProfile } from '../../stores/CompanyProfile'


export default defineComponent({
  name: 'CartScript',  
  setup() {
    const CompanyProfile = useCompanyProfile();
    const fetchCart = useCartStore()

    const isObjectEmpty = computed(() => {
        if (fetchCart.cart.items !== undefined) {

            const itemNames = Object.values<CartItem>(fetchCart.cart.items).map((item) => item.name);
            const checkForMeasure = itemNames.includes('Check Measure')

            if (checkForMeasure && itemNames.length === 1) {
                return false // Only 'Check Measure' is present
            }

            return itemNames.length > 0
        } else {
            return false
        }
    });
    const CartTemplate = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import('@/components/template_01/Cart/MainView.vue');
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import('@/components/template_01/Cart/MainView.vue');
        }
      },
    });
    const CartDetail = defineAsyncComponent(() =>
      import('@/components/template_01/Cart/CartDetail.vue')
    )

    const CartTotalAndPromo = defineAsyncComponent(() =>
      import('@/components/template_01/Cart/CartTotalAndPromo.vue')
    )
    
    return {
      CompanyProfile,
      useCartStore,
      useAuthStore,
      isObjectEmpty,
      CartDetail,
      fetchCart,
      CartTemplate,
      CartTotalAndPromo
    };
  },
});