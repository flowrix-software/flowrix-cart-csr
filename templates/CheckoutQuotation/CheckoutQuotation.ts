import { ref, computed, watch, onMounted, onBeforeUnmount, defineComponent, defineAsyncComponent } from "vue";

import { useRouter,useRoute } from 'vue-router'
import { useCheckoutStore } from "../../stores/Checkout";
import { useQuotationCheckout } from "../../stores/QuotationCheckout";
import { useCountryStore } from "../../stores/Country";
import { useUserstore } from "../../stores/Userstore";
import { getStripeElements } from '../Checkout/PaymentMethods/Stripe';
export default defineComponent({
  name: 'CheckoutQuotation',  
  setup() {
  	
  	const router = useRouter()
  	const route = useRoute()
		const QuotationCheckout = useQuotationCheckout()
			const checkoutStore = useCheckoutStore()



		
			const addLoading = () => {
	    const loadingDiv = document.createElement('div');
	    loadingDiv.className = 'loading';

	    const spanElement = document.createElement('span');
	    loadingDiv.appendChild(spanElement);

	    // Get the body element and add the loadingDiv as its first child
	    const bodyElement = document.body;
	    bodyElement.insertBefore(loadingDiv, bodyElement.firstChild);
	}

		const removeLoading = (): void => {
	    if (document.querySelector('.loading')) {
	        document.querySelector('.loading').remove()
	    }
	}

	const QuotationData = computed(()=> QuotationCheckout.QuotationData.data)

	const inputData = ref(QuotationData)


	const BillingDetailsForm = defineAsyncComponent(() =>
		import('@/components/template_01/CheckoutQuotation/BillingAddress.vue')
	)

	const DeliveryMethodForm = defineAsyncComponent(() =>
		import('@/components/template_01/CheckoutQuotation/DeliveryMethod.vue')
	)

	const ShippingDetailsForm = defineAsyncComponent(() =>
		import('@/components/template_01/CheckoutQuotation/ShippingAddress.vue')
	)

	const ShippingMethodForm = defineAsyncComponent(() =>
		import('@/components/template_01/CheckoutQuotation/ShippingMethod.vue')
	)

	const Calculations = defineAsyncComponent(() =>
		import('@/components/template_01/CheckoutQuotation/Calculations.vue')
	)

	const Order = defineAsyncComponent(() =>
		import('@/components/template_01/CheckoutQuotation/Order.vue')
	)

	const AuthorityToLeave = defineAsyncComponent(() =>
		import('@/components/template_01/CheckoutQuotation/AuthorityToLeave.vue')
	)

	const PaymentMethods = defineAsyncComponent(() =>
		import('@/components/template_01/Checkout/PaymentMethods/PaymentMethods.vue')
	)

		function showMessage(messageText: string): void {
	    const messageContainer = document.querySelector<HTMLElement>('#payment-message');
	    if (messageContainer) {
	        const errorbody = messageContainer.querySelector<HTMLElement>('.alert-body');
	        if (errorbody) {
	            messageContainer.classList.remove('d-none');
	            errorbody.textContent = messageText;

	            setTimeout(() => {
	                messageContainer.classList.add('d-none');
	                messageContainer.textContent = '';
	            }, 14000);
	        }
	    }
	}


	const handleSubmit = async (url_cancel,url_success) => {
	    try {

	        const resolved = router.resolve({
	            name: 'ThankYou'
	        })
	        addLoading();

	        	
	        // if (inputData.value.paymentmethod == 'web-stripe') {
	            inputData.value.clientsceret = checkoutStore?.publishableKey?.clientsceret
	        // }

	       checkoutStore.checkoutSession.fields.url_success = `${window.location.origin}${url_success}`
	        checkoutStore.checkoutSession.fields.url_cancel = `${window.location.origin}${url_cancel}`

	        // }
	        if (inputData.value.paymentmethod == 'web-eway') {
	            const cardnumber = eCrypt.encryptValue(checkoutStore.checkoutSession.fields.eway_cardnumber, inputData.value.ewayKey);
	            const eway_cvn = eCrypt.encryptValue(checkoutStore.checkoutSession.fields.eway_cvn, inputData.value.ewayKey);
	            checkoutStore.checkoutSession.fields.eway_cardnumber = cardnumber
	            checkoutStore.checkoutSession.fields.eway_cvn = eway_cvn
	            // inputData.value.ewayKey=''
	        }
	        // sessiondata.publishableKey.clientsceret = inputData.value.clientsceret
	        await QuotationCheckout.submitCheckout(route.params.slug,checkoutStore.checkoutSession)
	        if (QuotationCheckout.responseData.status == "Success") {
	            if (inputData.value.paymentmethod == 'web-stripe') {
	            	const { stripe, elements } = await getStripeElements(
				      checkoutStore.publishableKey.key, 
				      inputData.value.clientsceret
				    );
	                if (QuotationData.value.grandtotal > 0) {
	                    const { error } = await stripe.confirmPayment({
	                        elements,
	                        confirmParams: {
	                            // Make sure to change this to your payment completion page
	                            return_url: window.location.origin + resolved.href,
	                            receipt_email: inputData.value.email
	                        }
	                    })
	                    if (error.type === 'card_error' || error.type === 'validation_error') {

	                        showMessage(error.message)
	                    } else {
	                        // router.push({ name: 'ThankYou' })
	                    }
	                } else {
	                	console.log(QuotationData.value)
	                    // showMessage(error.message)
	                }
	            } else if (QuotationCheckout.responseData.data.url) {
	                var url = QuotationCheckout.responseData.data.url
	                window.location.href = url
	            }else{
	                router.push({ name: 'ThankYou' })
	            }
	            removeLoading()
	        } else if (QuotationCheckout.errorResponseData.status == 'Error') {
	            removeLoading()
	        }
	    } catch (error) {
	        removeLoading()
	        console.log('Error', error)
	    } finally {
	        // router.push({ name: 'ThankYou' })
	        removeLoading()

	    }
	}


	return{
		QuotationCheckout,
		inputData,
		router,
		route,
		QuotationData,
		BillingDetailsForm,
		DeliveryMethodForm,
		ShippingDetailsForm,
		ShippingMethodForm,
		Calculations,
		Order,
		AuthorityToLeave,
		PaymentMethods,
		handleSubmit
	}

  }

 });