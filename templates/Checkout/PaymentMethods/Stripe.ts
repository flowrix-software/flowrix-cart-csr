import { defineComponent } from "vue";
import { loadStripe } from '@stripe/stripe-js';
import { useCheckoutStore } from "../../../stores/Checkout";

// Declare stripe and elements globally, but don't export them yet
let stripe = null;
let elements = null;

export default defineComponent({
  name: 'StripeScript',
  setup() {
    const checkoutStore = useCheckoutStore();
    const loader = 'auto';

    // Function to initialize and mount Stripe elements
    const getpaymentMethod = async (paymentMethod, inputData, totalPrice) => {
      try {
        inputData.paymentmethod = paymentMethod;
        const newPrice = parseFloat(totalPrice);

        if (paymentMethod === 'web-stripe') {
          // Show loading indicator
          document.querySelector('#card-element').innerHTML = `<div class="payment-loading text-center">Loading...</div>`;

          const appearance = { theme: 'stripe' };
          await checkoutStore.paymentMethods({
            clientsceret: checkoutStore.publishableKey.clientsceret,
            paymentmethod: paymentMethod,
            total: newPrice * 100,
          });

          const clientSecret = checkoutStore.publishableKey.clientsceret;
          inputData.clientsceret = clientSecret
          // Load stripe if not already loaded
          // if (!stripe) {
            stripe = await loadStripe(checkoutStore.publishableKey.key);
          // }

          // if (!elements) {
            elements = stripe.elements({ appearance, clientSecret, loader });
          // }

          // Create and mount the payment element
          const paymentElementOptions = { layout: { type: 'tabs' } };
          const cardElement = elements.create('payment', paymentElementOptions);
          cardElement.mount('#card-element');
        }

       

       

        // Save the session data
        checkoutStore.saveToCheckoutSession(inputData);
      } catch (error) {
        console.log('Error', error);
      }
    };

    return { getpaymentMethod };
  },
});

// Function to get the initialized stripe and elements
export const getStripeElements = async (publishableKey, clientSecret) => {
  if (!stripe) {
    stripe = await loadStripe(publishableKey);
  }

  if (!elements) {
    elements = stripe.elements({ clientSecret });
  }

  return { stripe, elements };
};