import { defineComponent, defineProps, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../../stores/Cart";
export default defineComponent({
  name: "SimpleAddtoCart",

  setup(props) {
    const router = useRouter();
    const cartStore = useCartStore();
    const productQty = ref(1);

    const addToCart = async (product, qty) => {
      cartStore.addToCart(product, qty);
      router.push({ name: "Cart" });
    };

    // const checkInCart = ref(0);

    const checkInCart = (product) => {
      // Check if the product is in the cart and update quantity if found
      console.log(product)
      if (cartStore.cart.items) {
        const item = Object.values(cartStore.cart.items).find(
          (v) => v.slug === product.slug
        );
        if (item) {
          productQty.value = item.qty;
          return true;
        }
      }
      productQty.value = 1;
      return false;
    };

    const incrementQuantity = () => {
      productQty.value++;
    };

    const decrementQuantity = () => {
      if (productQty.value > 1) {
        productQty.value--;
      }
    };
    
    return {
      addToCart,
      productQty,
      checkInCart,
      incrementQuantity,
      decrementQuantity
    };
  }
});
