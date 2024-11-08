import { defineComponent,defineAsyncComponent,ref,onMounted,computed } from "vue";
import {useCartStore} from '../../stores/Cart'

export default defineComponent({
  name: 'ProdcutCard',
  props: {
    template: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {    
    const CartStore = useCartStore()
    const item =  computed(() => props.item);
    const ProdcutCard = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import(`@/components/template_${props.template}/Product/ProductCard.vue`);
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import('@/components/template_01/Product/ProductCard.vue');
        }
      },
    });

    const promotionTag = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import('@/components/Others/promotionTag.vue');
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import('@/components/Others/promotionTag.vue');
        }
      },
    });

    const checkInCart = ref(0)
    const productQty = ref(1)
    const isProductInCart = (productId: string) => {
        // Iterate over the cart object and check if the product ID exists
        if (CartStore.cart.items) {
            var isincart = Object.values(CartStore.cart.items).filter((v) => v.slug == productId)
            if (isincart.length > 0) {
                productQty.value = isincart[0].qty
                checkInCart.value = 1
            } else {
                productQty.value = 0
                checkInCart.value = 0

            }
        }
    }

    const updateQuantity = async (product: object, quantity: number) => {
        const SingleProduct = Object.values(CartStore.cart.items).find(item => item.slug === product.slug);
        await CartStore.updateQuantity(SingleProduct, quantity)
        productQty.value = SingleProduct.qty
        isProductInCart(product.slug);
    }

    const addToCart = async (product: object, qty: number) => {
        // router.push({ name: 'Cart' })
        await useCartStore().addToCart(product, qty)
        isProductInCart(product.slug);
    }

    const imagesize = ((swatchImage: string) => {
        if (swatchImage) {
            let swatchImage320 = swatchImage.replace(/.webp/gi, '320.webp')
            return swatchImage320
        }
        return swatchImage
    })

    return {
      ProdcutCard,
      imagesize,
      addToCart,
      updateQuantity,
      checkInCart,
      productQty,
      isProductInCart,
      promotionTag
    };
  },
});