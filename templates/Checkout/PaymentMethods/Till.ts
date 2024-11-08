import {defineComponent, defineAsyncComponent } from "vue";
import { loadStripe } from '@stripe/stripe-js'
import { useCheckoutStore } from "../../../stores/Checkout";
import { useUserstore } from "../../../stores/Userstore";
export default defineComponent({
  name: 'TillScript',  
  setup() {
  	const checkoutStore = useCheckoutStore();
  	const Userstore = useUserstore();
		const payment = new PaymentJs();
		const getpaymentMethod = async (paymentMethod,inputData,totalPrice) => {
			  try {
		        inputData.paymentmethod = paymentMethod
		        const newPrice = parseFloat(totalPrice)
		        if (paymentMethod == 'web-till-payment') {
		            await checkoutStore.paymentMethods({
		                paymentmethod: paymentMethod,
		                total: newPrice
		            })

		            payment.init('TFtrYq0SAcyy5l2cxi3a', 'number_div', 'cvv_div', function (payment) {
	                    var numberFocused = false;
	                    var cvvFocused = false;
	                    var focusStyle = {
	                        'border': '0px solid green',
	                        outline:'none',
	                        fontSize: '18px',
	                        color: '#333333'
	                    };
	                    payment.numberOn('focus', function () {
	                        numberFocused = true;
	                        payment.setNumberStyle(focusStyle);
	                    });
	                    payment.cvvOn('focus', function () {
	                        cvvFocused = true;
	                        payment.setCvvStyle(focusStyle);
	                    });
		                payment.setNumberStyle({
		                    'width': '100%',
		                    'height': '100%',
		                    'border': 'none',
		                    'input:focus-visible': {
		                        'outline': '-webkit-focus-ring-color auto 0px'
		                    }
		                });
		                payment.setCvvStyle({
		                    'width': '100%',
		                    'height': '100%',
		                    'border': 'none'
		                });
		                payment.numberOn('input', function () {
		                    var data = {
		                        card_holder: inputData.till_cardname,
		                        month: inputData.till_expirymonth,
		                        year: inputData.till_expiryyear,
		                    };
		                    payment.tokenize(data, //additional data, MUST include card_holder (or first_name & last_name), month and year
		                        function (token) { //success callback function
		                            inputData.clientsceret = token
	                                checkoutStore.saveToCheckoutSession(inputData)
		                        },
		                        function (errors) { //error callback function
		                            console.log(errors)
		                            //render error information here
		                        }
		                    )
		                })
		            });

		        }
		        checkoutStore.saveToCheckoutSession(inputData)
		    } catch (error) {
		        console.log('Error', error)
		    }
		}
	    function saveToCheckoutSession() {
	    checkoutStore.saveToCheckoutSession(inputData)
	}
	
	return{
		checkoutStore,
		Userstore,
		getpaymentMethod,
		saveToCheckoutSession
	}

  }

 });