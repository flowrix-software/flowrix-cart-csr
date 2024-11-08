import {defineComponent, defineAsyncComponent } from "vue";
import { loadStripe } from '@stripe/stripe-js'
import { useCheckoutStore } from "../../../stores/Checkout";
export default defineComponent({
  name: 'PaypalScript',  
  setup() {
  	const checkoutStore = useCheckoutStore();
		
	const getpaymentMethod = async (paymentMethod,inputData,totalPrice) => {
	    try {
	        inputData.paymentmethod = paymentMethod
	        const newPrice = parseFloat(totalPrice)
	        if (paymentMethod == 'web-paypal') {
	            await checkoutStore.paymentMethods({
	                paymentmethod: paymentMethod,
	                total: newPrice
	            })
	        }
	        checkoutStore.saveToCheckoutSession(inputData)
	    } catch (error) {
	        console.log('Error', error)
	    }
	}
	
	return{
		getpaymentMethod
	}

  }

 });