import { defineComponent,defineAsyncComponent } from 'vue';
import { ref,computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../../stores/Cart'
import { useCompanyProfile } from '../../stores/CompanyProfile'

export default defineComponent({
  name: 'CartDetailsScript',  
  setup() {
    const CompanyProfile = useCompanyProfile();
    const route = useRoute()
    const fetchCart = useCartStore()

    const cartData = computed(() => {
      const cartItems = fetchCart.cart.items
      return cartItems
    })
    
    const cartTotal = computed(() => {
      const cartTotals = fetchCart.cart.totals
      return cartTotals
    })

    const removeFromCart = (productId: string,product: Object) => {
      fetchCart.removeFromCart(productId)
    }

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

    const dvidedsummary = ((sammarydata: any) => {
      let sumary = []
      let firstMidpoint = Math.ceil(sammarydata.length / 2);

      sumary[0] = sammarydata.slice(0, firstMidpoint);
      sumary[1] = sammarydata.slice(firstMidpoint);
      // sumary.push({firstHalf})
      // sumary.push({secondHalf})
      return sumary
    });

    const toggleClass = (element: Element, className: string) => {
      if (element.classList.contains(className)) {
        element.classList.remove(className)
      } else {
        element.classList.add(className)
      }
    }

    const openBundle = (id: string) => {
      const bundle = document.querySelector(`.bundle_${id}`)
      const elems = document.querySelector(`.open_bundle${id}`)?.querySelector('.fas')

      if (bundle && elems) {
        toggleClass(elems, 'fa-angle-down')
        toggleClass(elems, 'fa-angle-up')
        toggleClass(bundle, 'd-none')
      }
    }

    const openAttributes = (id: string) => {
      const attributes = document.querySelector(`.attributes_${id}`)
      const elems = document.querySelector(`.open_attributes${id}`)?.querySelector('.fas')

      if (attributes && elems) {
        toggleClass(elems, 'fa-angle-down')
        toggleClass(elems, 'fa-angle-up')
        toggleClass(attributes, 'd-none')
      }
    }
    const showOptions = ref(0)
    
    const CartDetail = defineAsyncComponent(() =>
      import('@/components/template_01/Cart/CartDetail.vue')
    )
    const couponCodes = ref('');
    const ApplyCoupon = async (coupon:string) => {
      try {
          await fetchCart.ApplyCoupon({ code: coupon })
          couponCodes.value = fetchCart.coupon
          coupon = ''
      } catch (error) {
          coupon = ''
      }
  }
  
  const RemoveCoupon = async (coupon:string,removeIndex: number) => {
      try {
          await fetchCart.ApplyCoupon({ code: coupon, remove: removeIndex })
          couponCodes.value = fetchCart.coupon
          coupon = ''
      } catch (error) {
          coupon = ''
      }
  }
    return {
      CompanyProfile,
      useCartStore,
      fetchCart,
      couponCodes,
      cartData,
      cartTotal,
      removeFromCart, 
      isObjectEmpty,  
      dvidedsummary,  
      toggleClass,  
      openBundle, 
      openAttributes, 
      showOptions,  
      CartDetail,
      ApplyCoupon,
      RemoveCoupon
    };
  },
});