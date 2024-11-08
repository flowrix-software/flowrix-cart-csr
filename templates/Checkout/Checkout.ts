import { ref, computed, watch, onMounted, onBeforeUnmount, defineComponent, defineAsyncComponent } from "vue";

import { useRouter,useRoute } from 'vue-router'
import { useCartStore } from "../../stores/Cart";
import { useAuthStore } from '../../stores/AuthStore';
import { useCheckoutStore } from "../../stores/Checkout";
import { useCountryStore } from "../../stores/Country";
import { getStripeElements } from './PaymentMethods/Stripe';
export default defineComponent({
  name: 'FooterScript',  
  setup() {
  	const router = useRouter()
  	const route = useRoute()
	const cartStore = useCartStore()
	const checkoutStore = useCheckoutStore()
	const CountryData = useCountryStore()
	const AuthStore = useAuthStore()
	const shippingFormEnabled = ref(true)
	const isCustomer = ref(false)
	const countries = ref(CountryData.countries)
	const cartData = computed(() => {
	    const cartItems = checkoutStore.config
	    return cartItems
	})
	const abndToken = cartStore.cart.abndToken
	const vouchercode = cartStore.cart.code
	const sessiondata = computed (()=>checkoutStore.checkoutSession);
	const inputData = ref({
	    deliverymethod: sessiondata.value.fields ? sessiondata.value.fields.deliverymethod : '',
	    billing_address: sessiondata.value.fields ? sessiondata.value.fields.billing_address : '',
	    billing_country: 14,
	    shippingasbilling:shippingFormEnabled.value,
	    isCustomer:isCustomer.value,
	    billing_state: sessiondata.value.fields ? sessiondata.value.fields.billing_state : '',
	    billing_suburb: sessiondata.value.fields ? sessiondata.value.fields.billing_suburb : '',
	    clientsceret: checkoutStore.publishableKey.clientsceret,
	    billing_postcode: sessiondata.value.fields ? sessiondata.value.fields.billing_postcode : undefined,
	    billing_mobile: sessiondata.value.fields ? sessiondata.value.fields.billing_mobile : '',
	    
	    billing_firstname: sessiondata.value.fields ? sessiondata.value.fields.billing_firstname : '',
	    firstname: sessiondata.value.fields ? sessiondata.value.fields.firstname : '',
	    billing_middlename: sessiondata.value.fields ? sessiondata.value.fields.billing_middlename : '',
	    billing_lastname: sessiondata.value.fields ? sessiondata.value.fields.billing_lastname : '',
	    lastname: sessiondata.value.fields ? sessiondata.value.fields.lastname : '',
	    shipping_address: sessiondata.value.fields ? sessiondata.value.fields.shipping_address : '',
	    shippingmethod: sessiondata.value.fields ? sessiondata.value.fields.shippingmethod : '',
	    shipping_country: 14,
	    shipping_state: sessiondata.value.fields ? sessiondata.value.fields.shipping_state : undefined,
	    shipping_suburb: sessiondata.value.fields ? sessiondata.value.fields.shipping_suburb : '',
	    shipping_postcode: sessiondata.value.fields ? sessiondata.value.fields.shipping_postcode : undefined,
	    shipping_mobile: sessiondata.value.fields ? sessiondata.value.fields.shipping_mobile : '',
	    shipping_firstname: sessiondata.value.fields ? sessiondata.value.fields.shipping_firstname : '',
	    shipping_middlename: sessiondata.value.fields ? sessiondata.value.fields.shipping_middlename : '',
	    shipping_lastname: sessiondata.value.fields ? sessiondata.value.fields.shipping_lastname : '',
	    vouchercode,
	    paymentmethod: '',
	    cart: cartData.value.items,
	    abndToken,
	    customertoken: '',
	    email: sessiondata.value.fields ? sessiondata.value.fields.email : '',
	    mobile: sessiondata.value.fields ? sessiondata.value.fields.mobile : '',
	    authoritytoleave: undefined,
	    register: '',
	    password: '',
	    password_confirmation: '',
	    passwordStrengthValue:'',
	    customernotes: '',
	    ewayKey: '',
	    eway_cardname: '',
	    eway_cardnumber: '',
	    eway_expirymonth: '',
	    eway_expiryyear: '',
	    eway_cvn: '',
	    till_cardname: '',
	    till_cardnumber: '',
	    till_cvn: '',
	    till_expirymonth: '',
	    till_expiryyear: '',
	    save_card_details: 0,
	})

	watch(AuthStore, async (newData, oldValue) => {
	    updateUserFieldsIfuserLogin();
	})

	const updateUserFieldsIfuserLogin = (async (sameasbilling=false)=>{   
    const LoggedInUser = await AuthStore.user
    console.log(LoggedInUser);
    console.log(Object.keys(LoggedInUser).length);
    if (Object.keys(LoggedInUser).length > 0) {
        const billingAddres = LoggedInUser.addresses.filter((address) => address.billing == 1)[0]
        const shippingAddres = LoggedInUser.addresses.filter((address) => address.shipping == 1)[0]
        inputData.value.billing_firstname = LoggedInUser.firstname
        inputData.value.billing_lastname = LoggedInUser.lastname
        inputData.value.email = LoggedInUser.email
        inputData.value.billing_mobile = LoggedInUser.mobile
        if(sameasbilling == true){
                
                inputData.value.billing_firstname = inputData.value.billing_firstname?inputData.value.billing_firstname:billingAddres.firstname
                inputData.value.billing_lastname = inputData.value.billing_lastname?inputData.value.billing_lastname:billingAddres.lastname
                inputData.value.billing_address = inputData.value.billing_address?inputData.value.billing_address:billingAddres.address
                inputData.value.billing_postcode = inputData.value.billing_postcode?inputData.value.billing_postcode:billingAddres.postcode
                inputData.value.billing_state = inputData.value.billing_state?inputData.value.billing_state:billingAddres.state_id
                inputData.value.billing_suburb = inputData.value.billing_suburb?inputData.value.billing_suburb:billingAddres.suburb
                inputData.value.billing_mobile = inputData.value.billing_mobile?inputData.value.billing_mobile:billingAddres.mobile

                
                inputData.value.shipping_firstname = inputData.value.billing_firstname?inputData.value.billing_firstname:billingAddres.firstname
                inputData.value.shipping_lastname = inputData.value.billing_lastname?inputData.value.billing_lastname:billingAddres.lastname
                inputData.value.shipping_address = inputData.value.billing_address?inputData.value.billing_address:billingAddres.address
                inputData.value.shipping_postcode = inputData.value.billing_postcode?inputData.value.billing_postcode:billingAddres.postcode
                inputData.value.shipping_state = inputData.value.billing_state?inputData.value.billing_state:billingAddres.state_id
                inputData.value.shipping_suburb = inputData.value.billing_suburb?inputData.value.billing_suburb:billingAddres.suburb
                inputData.value.shipping_mobile = inputData.value.billing_mobile?inputData.value.billing_mobile:billingAddres.mobile
        }
         else{            
         	console.log(billingAddres)
         	console.log(shippingAddres)
            
            if (billingAddres!=undefined) {
                
                inputData.value.billing_firstname = inputData.value.billing_firstname?inputData.value.billing_firstname:billingAddres.firstname
                inputData.value.billing_lastname = inputData.value.billing_lastname?inputData.value.billing_lastname:billingAddres.lastname
                inputData.value.billing_address = inputData.value.billing_address?inputData.value.billing_address:billingAddres.address
                inputData.value.billing_postcode = inputData.value.billing_postcode?inputData.value.billing_postcode:billingAddres.postcode
                inputData.value.billing_state = inputData.value.billing_state?inputData.value.billing_state:billingAddres.state_id
                inputData.value.billing_suburb = inputData.value.billing_suburb?inputData.value.billing_suburb:billingAddres.suburb
                inputData.value.billing_mobile = inputData.value.billing_mobile?inputData.value.billing_mobile:billingAddres.mobile
            }
            if (shippingAddres!=undefined) {
                inputData.value.shipping_fullname = ''
            inputData.value.shipping_firstname = ''
            inputData.value.shipping_lastname = ''
            inputData.value.shipping_address = ''
            inputData.value.shipping_postcode = ''
            inputData.value.shipping_state = ''
            inputData.value.shipping_suburb = ''
            inputData.value.shipping_mobile = ''
                inputData.value.shipping_fullname = shippingAddres.fullname
                inputData.value.shipping_firstname = shippingAddres.firstname
                inputData.value.shipping_lastname = shippingAddres.lastname
                inputData.value.shipping_address = shippingAddres.address
                inputData.value.shipping_postcode = shippingAddres.postcode
                inputData.value.shipping_state = shippingAddres.state_id
                inputData.value.shipping_suburb = shippingAddres.suburb
                inputData.value.shipping_mobile = shippingAddres.mobile
            }
        }            
    }
    else if(Object.keys(LoggedInUser).length == 0 && sameasbilling == true){
            
            inputData.value.shipping_firstname = inputData.value.billing_firstname?inputData.value.billing_firstname:'s'
            inputData.value.shipping_lastname = inputData.value.billing_lastname?inputData.value.billing_lastname:''
            inputData.value.shipping_address = inputData.value.billing_address?inputData.value.billing_address:''
            inputData.value.shipping_postcode = inputData.value.billing_postcode?inputData.value.billing_postcode:''
            inputData.value.shipping_state = inputData.value.billing_state?inputData.value.billing_state:''
            inputData.value.shipping_suburb = inputData.value.billing_suburb?inputData.value.billing_suburb:''
            inputData.value.shipping_mobile = inputData.value.billing_mobile?inputData.value.billing_mobile:''
          
    }
     else{
        
        inputData.value.shipping_fullname = ''
        inputData.value.shipping_firstname = ''
        inputData.value.shipping_lastname = ''
        inputData.value.shipping_address = ''
        inputData.value.shipping_postcode = ''
        inputData.value.shipping_state = ''
        inputData.value.shipping_suburb = ''
        inputData.value.shipping_mobile = ''
        
     }
         checkoutStore.saveToCheckoutSession(inputData.value)

	})

	onMounted(() => {
	    updateUserFieldsIfuserLogin(inputData.value.shippingasbilling);
	})

	const totalPrice = computed(() => {
	    return checkoutStore.config ? checkoutStore.config.calculations.total : checkoutStore.config.total
	})

	const deliveryMethods = computed<any>(() => {

	    return checkoutStore.config?.preferences || [];
	});

	const states = ref([])
	const getStates = computed(() => {
	    if (countries.value.length > 0) {
	        const country = countries.value.find(country => country.id == '14');
	        if (country) {
	            states.value = country.states;
	        }
	    }
	    return states.value;
	});

	watch(inputData.value, async (newData, oldValue) => {
	    // updateUserFieldsIfuserLogin(inputData.value.shippingasbilling);
	})


	const shippingMethods = computed(() => {
	    if (checkoutStore.config) {
	        return checkoutStore.config.shippingmethods.filter((method: { available: number }) => method.available == 1)
	    }
	})
	watch(() => checkoutStore.config.shippingmethods, (newValue, oldValue) => {
	    if (shippingMethods.value.length == 1) {
	        inputData.value.shippingmethod = shippingMethods.value[0].id
	        // checkoutStore.saveToCheckoutSession(inputData.value)
	    }
	})

	const step_2 = ref(false)
	const proceedtoNext = () => {
	    checkoutStore.saveToCheckoutSession(inputData.value)
	    step_2.value = true

	}

	const step1Valid = computed(() => ((inputData.value.register==false && inputData.value.password=='' && inputData.value.password_confirmation=='') || (inputData.value.register==true && inputData.value.password!='' && inputData.value.password_confirmation!='' &&inputData.value.password==inputData.value.password_confirmation && inputData.value.passwordStrengthValue=='100')) && inputData.value.billing_firstname !== '' && inputData.value.billing_lastname !== '' && inputData.value.billing_email !== '' && inputData.value.billing_mobile !== '' && inputData.value.billing_address !== '' && inputData.value.billing_suburb !== '' && inputData.value.billing_postcode !== '' && inputData.value.billing_state !== '');
	const step2Valid = computed(() => step1Valid.value && inputData.value.paymentmethod !== '');
	const proceedtoPrev = () => {
	    step_2.value = false
	}

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

	

	const handleSubmit = async (url_cancel,url_success) => {
	    try {

	    	
	        const LoggedInUser = AuthStore.user
	        if (Object.keys(LoggedInUser).length == 0) {
	            sessiondata.value.fields.firstname = inputData.value.billing_firstname
	            sessiondata.value.fields.lastname = inputData.value.billing_lastname
	        }
	        sessiondata.value.fields.mobile = inputData.value.billing_mobile?inputData.value.billing_mobile:inputData.value.billing_phone

	        const resolved = router.resolve({
	            name: 'ThankYou'
	        })
	        addLoading();

	        	
	        // if (inputData.value.paymentmethod == 'web-stripe') {
	            inputData.value.clientsceret = checkoutStore?.publishableKey?.clientsceret
	        // }

	        sessiondata.value.fields.url_success = `${window.location.origin}${url_success}`
	        sessiondata.value.fields.url_cancel = `${window.location.origin}${url_cancel}`

	        // }
	        if (inputData.value.paymentmethod == 'web-eway') {
	            const cardnumber = eCrypt.encryptValue(sessiondata.value.fields.eway_cardnumber, inputData.value.ewayKey);
	            const eway_cvn = eCrypt.encryptValue(sessiondata.value.fields.eway_cvn, inputData.value.ewayKey);
	            sessiondata.value.fields.eway_cardnumber = cardnumber
	            sessiondata.value.fields.eway_cvn = eway_cvn
	            // inputData.value.ewayKey=''
	        }
	        // sessiondata.value.publishableKey.clientsceret = inputData.value.clientsceret
	        await checkoutStore.submitCheckout()
	        if (checkoutStore.errorResponseData.status !== 'Error') {
	            if (inputData.value.paymentmethod == 'web-stripe') {
	            	const { stripe, elements } = await getStripeElements(
				      checkoutStore.publishableKey.key, 
				      inputData.value.clientsceret
				    );
	                if (sessiondata.value.calculations.total > 0) {
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
	                    showMessage(error.message)
	                }
	            } else if (checkoutStore.responseData.data.url) {
	                var url = checkoutStore.responseData.data.url
	                window.location.href = url
	            }else{
	                router.push({ name: 'ThankYou' })
	            }
	            removeLoading()
	        } else if (checkoutStore.errorResponseData.status == 'Error') {
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


  	const BillingDetailsForm = defineAsyncComponent(() =>
		import('@/components/template_01/Checkout/BillingAddress.vue')
	)

	const DeliveryMethodForm = defineAsyncComponent(() =>
		import('@/components/template_01/Checkout/DeliveryMethod.vue')
	)

	const ShippingDetailsForm = defineAsyncComponent(() =>
		import('@/components/template_01/Checkout/ShippingAddress.vue')
	)

	const ShippingMethodForm = defineAsyncComponent(() =>
		import('@/components/template_01/Checkout/ShippingMethod.vue')
	)

	const Calculations = defineAsyncComponent(() =>
		import('@/components/template_01/Checkout/Calculations.vue')
	)

	const Order = defineAsyncComponent(() =>
		import('@/components/template_01/Checkout/Order.vue')
	)

	const AuthorityToLeave = defineAsyncComponent(() =>
		import('@/components/template_01/Checkout/AuthorityToLeave.vue')
	)

	const PaymentMethods = defineAsyncComponent(() =>
		import('@/components/template_01/Checkout/PaymentMethods/PaymentMethods.vue')
	)

	const CreateAccount = defineAsyncComponent(() =>
		import('@/components/template_01/Checkout/CreateAccount.vue')
	)

	return{
		router,
		route,
		inputData,
		cartData,
		AuthStore,
		checkoutStore,
		BillingDetailsForm,
		DeliveryMethodForm,
		ShippingDetailsForm,
		ShippingMethodForm,
		Calculations,
		Order,
		states,
		CreateAccount,
		AuthorityToLeave,
		totalPrice,
		deliveryMethods,
		getStates,
		shippingMethods,
		proceedtoNext,
		proceedtoPrev,
		showMessage,
		handleSubmit,
		shippingFormEnabled,
		updateUserFieldsIfuserLogin,
		step_2,
		step1Valid,
		step2Valid,
		PaymentMethods
	}

  }

 });