import {defineComponent, defineAsyncComponent } from "vue";
import { loadStripe } from '@stripe/stripe-js'
import { useCheckoutStore } from "../../../stores/Checkout";
import { useUserstore } from "../../../stores/Userstore";
export default defineComponent({
  name: 'EwayScript',  
  setup() {
  	const checkoutStore = useCheckoutStore();
  	const Userstore = useUserstore();
	const getpaymentMethod = async (paymentMethod,inputData,totalPrice) => {
	    try {
	        inputData.paymentmethod = paymentMethod
	        const newPrice = parseFloat(totalPrice)
	        
	        if (paymentMethod == 'web-eway') {
	            await checkoutStore.paymentMethods({
	                paymentmethod: paymentMethod,
	                total: newPrice
	            })
	            
	                inputData.ewayKey = checkoutStore.publishableKey.key
	           
	        }
	        checkoutStore.saveToCheckoutSession(inputData)
	    } catch (error) {
	        console.log('Error', error)
	    }
	}


	function saveToCheckoutSession(inputData) {
	    // Implement your save logic
	    checkoutStore.saveToCheckoutSession(inputData)
	}

	function eWayCardValidations() {
	    const e = document.getElementById('EWAY_CARDNUMBER') as HTMLInputElement | null;
	    if (!e) return; // Ensure the element exists

	    const value = e.value.replace(/\s+/g, '');
	    let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();

	    // Set the max length based on the card type
	    if (value.startsWith('5')) {
	        // MasterCard (starts with 5) typically has 16 digits
	        e.maxLength = 18; // 16 digits + 3 spaces
	    } else if (value.startsWith('4')) {
	        // Visa (starts with 4) typically has 16 digits
	        e.maxLength = 19; // 16 digits + 3 spaces
	    } else {
	        // For other card types or when the card type is not yet determined
	        e.maxLength = 18; // Default to 19 to allow flexibility
	    }

	    // Update the input value with the formatted value
	    e.value = formattedValue;
	}

	const eWayMonthValidations = (() => {
	    const e = document.getElementById('eway_expirymonth') as HTMLInputElement | null;
	    if (!e) return; // Ensure the element exists

	    const value = e.value.replace(/\s+/g, '');
	    const numericValue = value.replace(/[^\d]/g, '');
	    // Enforce max length of 2
	    const limitedValue = numericValue.slice(0, 2);

	    // Validate the value to be between 01 and 12
	    let finalValue = limitedValue;
	    const month = parseInt(limitedValue, 10);
	    if (limitedValue.length === 2) {
	        if (month < 1) {
	            finalValue = '01';
	        } else if (month > 12) {
	            finalValue = '12';
	        }
	    }
	    if (month > 0 && month < 10 && limitedValue.length === 1) {
	        finalValue = '0' + limitedValue;
	    }

	    e.value = finalValue;
	});

	const eWayYearValidations = (() => {
	    const e = document.getElementById('eway_expiryyear') as HTMLInputElement | null;
	    if (!e) return; // Ensure the element exists

	    const value = e.value;

	    // Remove non-numeric characters
	    const numericValue = value.replace(/[^\d]/g, '');

	    // Enforce max length of 2
	    const limitedValue = numericValue.slice(0, 2);

	    // Validate the value to be a valid future year
	    let finalValue = limitedValue;
	    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
	    if (limitedValue.length === 2) {
	        const year = parseInt(limitedValue, 10);
	        if (year < currentYear) {
	            finalValue = String(currentYear).padStart(2, '0');
	        }
	    }

	    e.value = finalValue;
	});

	const ChangeCard =((token='')=>{			
	    checkoutStore.checkoutSession.fields.eway_cvn = ''
	    checkoutStore.checkoutSession.fields.customertoken = token
	    saveToCheckoutSession(checkoutStore.checkoutSession.fields)
	})
	
	return{
		getpaymentMethod,
		saveToCheckoutSession,
		eWayCardValidations,
		eWayMonthValidations,
		eWayYearValidations,
		ChangeCard,
		Userstore
	}

  }

 });