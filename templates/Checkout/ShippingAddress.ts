import { ref,defineComponent,computed } from 'vue';
import { useCheckoutStore } from "../../stores/Checkout";
import { useAuthStore } from '../../stores/AuthStore';
import StripeScript from './PaymentMethods/Stripe';

export default defineComponent({
  name: 'ShippingAddressScript',  
  setup() {	

  		const AuthStore = useAuthStore()
  	const checkoutStore = useCheckoutStore()
		const updateShippingAddress = ((shippingfield)=> {
    	checkoutStore.saveToCheckoutSession(shippingfield)
		})

		const sameAsBilling = (async (sameasbilling=false,inputData)=>{  
        const LoggedInUser = AuthStore.user
        if (Object.keys(LoggedInUser).length > 0) {
        const billingAddres = LoggedInUser.addresses.filter((address) => address.billing == 1)[0]
        const shippingAddres = LoggedInUser.addresses.filter((address) => address.shipping == 1)[0]
        inputData.billing_firstname = LoggedInUser.firstname
        inputData.billing_lastname = LoggedInUser.lastname
        inputData.email = LoggedInUser.email
        inputData.billing_mobile = LoggedInUser.mobile
        if(sameasbilling == true){
                
                inputData.billing_firstname = inputData.billing_firstname?inputData.billing_firstname:billingAddres.firstname
                inputData.billing_lastname = inputData.billing_lastname?inputData.billing_lastname:billingAddres.lastname
                inputData.billing_address = inputData.billing_address?inputData.billing_address:billingAddres.address
                inputData.billing_postcode = inputData.billing_postcode?inputData.billing_postcode:billingAddres.postcode
                inputData.billing_state = inputData.billing_state?inputData.billing_state:billingAddres.state_id
                inputData.billing_suburb = inputData.billing_suburb?inputData.billing_suburb:billingAddres.suburb
                inputData.billing_mobile = inputData.billing_mobile?inputData.billing_mobile:billingAddres.mobile

                
                inputData.shipping_firstname = inputData.billing_firstname?inputData.billing_firstname:billingAddres.firstname
                inputData.shipping_lastname = inputData.billing_lastname?inputData.billing_lastname:billingAddres.lastname
                inputData.shipping_address = inputData.billing_address?inputData.billing_address:billingAddres.address
                inputData.shipping_postcode = inputData.billing_postcode?inputData.billing_postcode:billingAddres.postcode
                inputData.shipping_state = inputData.billing_state?inputData.billing_state:billingAddres.state_id
                inputData.shipping_suburb = inputData.billing_suburb?inputData.billing_suburb:billingAddres.suburb
                inputData.shipping_mobile = inputData.billing_mobile?inputData.billing_mobile:billingAddres.mobile
        }
         else{            
            
            if (billingAddres.length!=undefined) {
                
                inputData.billing_firstname = inputData.billing_firstname?inputData.billing_firstname:billingAddres.firstname
                inputData.billing_lastname = inputData.billing_lastname?inputData.billing_lastname:billingAddres.lastname
                inputData.billing_address = inputData.billing_address?inputData.billing_address:billingAddres.address
                inputData.billing_postcode = inputData.billing_postcode?inputData.billing_postcode:billingAddres.postcode
                inputData.billing_state = inputData.billing_state?inputData.billing_state:billingAddres.state_id
                inputData.billing_suburb = inputData.billing_suburb?inputData.billing_suburb:billingAddres.suburb
                inputData.billing_mobile = inputData.billing_mobile?inputData.billing_mobile:billingAddres.mobile
            }
            if (shippingAddres!=undefined) {
                inputData.shipping_fullname = ''
                inputData.shipping_firstname = ''
                inputData.shipping_lastname = ''
                inputData.shipping_address = ''
                inputData.shipping_postcode = ''
                inputData.shipping_state = ''
                inputData.shipping_suburb = ''
                inputData.shipping_mobile = ''
                inputData.shipping_fullname = shippingAddres.fullname
                inputData.shipping_firstname = shippingAddres.firstname
                inputData.shipping_lastname = shippingAddres.lastname
                inputData.shipping_address = shippingAddres.address
                inputData.shipping_postcode = shippingAddres.postcode
                inputData.shipping_state = shippingAddres.state_id
                inputData.shipping_suburb = shippingAddres.suburb
                inputData.shipping_mobile = shippingAddres.mobile
            }
        }            
    }
    else if(Object.keys(LoggedInUser).length == 0 && sameasbilling == true){
            
            inputData.shipping_firstname = inputData.billing_firstname?inputData.billing_firstname:'s'
            inputData.shipping_lastname = inputData.billing_lastname?inputData.billing_lastname:''
            inputData.shipping_address = inputData.billing_address?inputData.billing_address:''
            inputData.shipping_postcode = inputData.billing_postcode?inputData.billing_postcode:''
            inputData.shipping_state = inputData.billing_state?inputData.billing_state:''
            inputData.shipping_suburb = inputData.billing_suburb?inputData.billing_suburb:''
            inputData.shipping_mobile = inputData.billing_mobile?inputData.billing_mobile:''
          
    }
     else{
        
        inputData.shipping_fullname = ''
        inputData.shipping_firstname = ''
        inputData.shipping_lastname = ''
        inputData.shipping_address = ''
        inputData.shipping_postcode = ''
        inputData.shipping_state = ''
        inputData.shipping_suburb = ''
        inputData.shipping_mobile = ''
        
     }
         UpdateStripe(inputData);
         checkoutStore.saveToCheckoutSession(inputData)

	})

    const UpdateStripe =(async(inputData)=>{
            await checkoutStore.saveToCheckoutSession(inputData)
            console.log(checkoutStore.config.calculations.total)
            const { getpaymentMethod } = StripeScript.setup();
        const totalPrice = computed(() => {
        return checkoutStore.config ? checkoutStore.config.calculations.total : checkoutStore.config.total
    })
        getpaymentMethod('web-stripe',inputData,totalPrice.value);
    });
    
	return{
		checkoutStore,		
		updateShippingAddress,
		sameAsBilling,
        UpdateStripe
	}

  }

 });