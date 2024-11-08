import {defineComponent, defineAsyncComponent } from "vue";
import { useCheckoutStore } from "../../../stores/Checkout";
export default defineComponent({
  name: 'DirectDepositScript',  
  setup() {
  	const checkoutStore = useCheckoutStore();
		
	const getpaymentMethod = async (paymentMethod,inputData,totalPrice) => {
	    try {
	        inputData.paymentmethod = paymentMethod
	        const newPrice = parseFloat(totalPrice)
	        if (paymentMethod == 'web-direct-deposit') {
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