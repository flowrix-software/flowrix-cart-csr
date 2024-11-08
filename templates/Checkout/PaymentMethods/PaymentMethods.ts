import {defineComponent, defineAsyncComponent } from "vue";
import { useCheckoutStore } from "../../../stores/Checkout";
export default defineComponent({
  name: 'PaymentMethodScript',  
  setup() {	
let stripe;
let elements;
	const checkoutStore = useCheckoutStore()
  	const Stripe = defineAsyncComponent(() =>
			import('@/components/template_01/Checkout/PaymentMethods/Stripe.vue')
		)

		const Eway = defineAsyncComponent(() =>
			import('@/components/template_01/Checkout/PaymentMethods/Eway.vue')
		)

		const Till = defineAsyncComponent(() =>
			import('@/components/template_01/Checkout/PaymentMethods/Till.vue')
		)
		const Paypal = defineAsyncComponent(() =>
			import('@/components/template_01/Checkout/PaymentMethods/Paypal.vue')
		)
		const DirectDeposit = defineAsyncComponent(() =>
			import('@/components/template_01/Checkout/PaymentMethods/DirectDeposit.vue')
		)
		 
		function getPaymentComponent(methodKey) {
		    switch (methodKey) {
		        case 'web-eway':
		            return Eway;
		        case 'web-till-payment':
		            return Till;
		        case 'web-stripe':
		            return Stripe;
						case 'web-paypal':
		            return Paypal;
		        case 'web-direct-deposit':
		            return DirectDeposit;
		        default:
		            return null;
		    }
		}

		const getpaymentMethod = async (paymentMethod,inputData,totalPrice) => {
			try {
				inputData.paymentmethod = paymentMethod
				const newPrice = parseFloat(totalPrice.total)
				if (paymentMethod == 'web-stripe' && stripe !== null) {
					document.querySelector('#card-element').innerHTML = (`<div class="payment-loading text-center"><svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 24 24"><circle cx="12" cy="12" r="0" fill="#f68c38"><animate id="svgSpinnersPulse30" fill="freeze" attributeName="r" begin="0;svgSpinnersPulse32.begin+0.8s" calcMode="spline" dur="2.4s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersPulse32.begin+0.8s" calcMode="spline" dur="2.4s" keySplines=".52,.6,.25,.99" values="1;0"/></circle><circle cx="12" cy="12" r="0" fill="#f68c38"><animate id="svgSpinnersPulse31" fill="freeze" attributeName="r" begin="svgSpinnersPulse30.begin+0.8s" calcMode="spline" dur="2.4s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulse30.begin+0.8s" calcMode="spline" dur="2.4s" keySplines=".52,.6,.25,.99" values="1;0"/></circle><circle cx="12" cy="12" r="0" fill="#f68c38"><animate id="svgSpinnersPulse32" fill="freeze" attributeName="r" begin="svgSpinnersPulse30.begin+1.6s" calcMode="spline" dur="2.4s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulse30.begin+1.6s" calcMode="spline" dur="2.4s" keySplines=".52,.6,.25,.99" values="1;0"/></circle></svg></div>`);
					const appearance = {
						theme: 'stripe'
					}
					await checkoutStore.paymentMethods({
						clientsceret: checkoutStore.publishableKey.clientsceret,
						paymentmethod: paymentMethod,
						total: newPrice * 100
					})
					const clientSecret = checkoutStore.publishableKey.clientsceret
					stripe = await loadStripe(checkoutStore.publishableKey.key)
					elements = stripe.elements({ appearance, clientSecret, loader })
					// const linkAuthenticationElement = elements.create("linkAuthentication");
	
					const paymentElementOptions = {
						layout: {
							type: 'tabs',
						}
					}
					// Mount the Elements to their corresponding DOM node
					const cardElement = elements.create('payment', paymentElementOptions)
					cardElement.mount('#card-element')
				}
				if (paymentMethod == 'web-zippay' || paymentMethod == 'web-direct-deposit' || paymentMethod == 'web-paypal' || paymentMethod == 'web-eway') {
					await checkoutStore.paymentMethods({
						paymentmethod: paymentMethod,
						total: newPrice
					})
					if (paymentMethod == 'web-eway') {
						inputData.ewayKey = checkoutStore.publishableKey.key
					}
				}
	
				if (paymentMethod == 'web-till-payment') {
					await checkoutStore.paymentMethods({
						paymentmethod: paymentMethod,
						total: newPrice
					})
	
					payment.init('TFtrYq0SAcyy5l2cxi3a', 'number_div', 'cvv_div', function (payment) {
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

	return{
		Stripe,
		Eway,
		Till,
		Paypal,
		DirectDeposit,
		getpaymentMethod,
		getPaymentComponent
	}

  }

 });