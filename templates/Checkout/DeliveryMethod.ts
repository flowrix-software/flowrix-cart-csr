import { ref, computed, watch, onMounted, onBeforeUnmount, defineComponent, defineAsyncComponent } from "vue";
import { useCheckoutStore } from "../../stores/Checkout";
import StripeScript from './PaymentMethods/Stripe';
export default defineComponent({
  name: 'DeliverymethodScript',  
  setup() {	
  	const checkoutStore = useCheckoutStore()
  	const updateDeliveryMethod = (async (inputData)=>{
	    // emit('getPreferences');
		   await checkoutStore.saveToCheckoutSession(inputData)
		    const { getpaymentMethod } = StripeScript.setup();
        const totalPrice = checkoutStore.config ? checkoutStore.config.calculations.total : checkoutStore.config.total
        console.log(inputData)
        if(inputData.paymentmethod && inputData.paymentmethod=='web-stripe'){
        	getpaymentMethod('web-stripe',inputData,totalPrice);
        }
		})

// const UpdateStripe =((inputData)=>{
//             const { getpaymentMethod } = StripeScript.setup();
//         const totalPrice = computed(() => {
//         return checkoutStore.config ? checkoutStore.config.calculations.total : checkoutStore.config.total
//     })
//         getpaymentMethod('web-stripe',inputData,totalPrice);
//     });
	return{
		checkoutStore,
		updateDeliveryMethod
	}

  }

 });