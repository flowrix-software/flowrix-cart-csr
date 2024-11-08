import {defineComponent, defineAsyncComponent } from "vue";
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserstore } from '../../stores/Userstore';
import { useNumberInput } from '../../composables/useNumberOnly';

export default defineComponent({
  name: 'BillingAddressScript',  
  setup() {
  	const userStore = useUserstore();
	const countries = ref('')
	const states = ref('')
	const updating = ref(false)
	console.log(userStore.user.addresses)
	const useradresses = userStore.user.addresses;
	const billingAddress = computed(() => {
	  return useradresses.find(address => address.billing === 1) || {
	    id: 0,
	    fullname: '',
	    firstname: '',
	    middlename: null,
	    lastname: '',
	    address: '',
	    saddress: '',
	    suburb: '',
	    state: '',
	    state_id: 0,
	    country: '',
	    country_id: 14,
	    postcode: '',
	    mobile: '',
	    shipping: 0,
	    billing: 1,
	  };
	});

	const addressForm = ref<Address>({ ...billingAddress.value });

	// Initialize useNumberInput composable for mobile
	const { inputValue: mobile, errorMessage: mobileError, handleInput: handleMobileInput } = useNumberInput();
	mobile.value = addressForm.value.mobile;
	const { inputValue: postcode, errorMessage: postCodeError, handleInput: handlePostCodeInput } = useNumberInput();
	postcode.value = addressForm.value.postcode;

	const alertMessage = ref<string | null>(null);

	const handleSubmit = async (event: Event) => {
	  event.preventDefault();
	  userStore.update_address = '';
	  updating.value = true;
	  addressForm.value.saddress = addressForm.value.address;

	  try {
	    if (addressForm.value.id) {
	      // Edit existing address
	      await userStore.updateAddress(addressForm.value);
	      alertMessage.value = 'Billing Address Updated Successfully';
	    } else {
	      // Add new address
	      await userStore.addNewAddress(addressForm.value);
	      alertMessage.value = 'New Address Added Successfully';
	    }

	    setTimeout(() => {
	      alertMessage.value = null;
	    }, 3000);
	  } catch (error) {
	    // Handle errors if needed
	    console.error('Failed to process address:', error);
	  }
	  updating.value = false;
	};

	onMounted(() => {
		userStore.update_address = ''
		userStore.errorResponseData = ''
		userStore.successResponse = ''
	  getstates();
	});

	const getstates=(async()=>{
	  await userStore.getCountries()
	  // if (userStore.countries.status === 'Success') {
	    countries.value = userStore.countries
	  const selected = countries.value.data.find((country) => country.id === 14)
	  if(selected){

	    states.value=selected.states
	  }
	})

	const updateAddress = () => {

	}
			
	return{
		userStore,
		countries,
		states,
		useradresses,
		billingAddress,
		addressForm,
		handleSubmit,
		getstates,
		updating
	}

  }

 });