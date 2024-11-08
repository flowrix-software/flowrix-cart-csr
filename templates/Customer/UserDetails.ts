import {defineComponent, defineAsyncComponent } from "vue";
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserstore } from '../../stores/Userstore';
import { useDateFormatter } from '../../composables/useDateFormatter';
import { useNumberInput } from '../..//composables/useNumberOnly'

export default defineComponent({
  name: 'LoginScript',  
  setup() {

	const userStore = useUserstore() as UserStore;
	const userData = computed(() => userStore.user?userStore.user:'' || {});

	const { inputValue: phone, errorMessage: phoneError, handleInput: handlePhoneInput } = useNumberInput();
	phone.value =userData.value.phone;

	const { inputValue: mobile, errorMessage: mobileError, handleInput: handleMobileInput } = useNumberInput();
	mobile.value =userData.value.mobile;

	const { formatDate, parseDate } = useDateFormatter();

	const isEdit = ref(false);
	
	// Address computation
	const address = computed(() => {
	  if (userData.value.addresses && userData.value.addresses.length > 0) {
	    const addr = userData.value.addresses.find(address => address.billing === 1)
	    const formattedAddress = `${addr.address ?? '-'} ${addr.suburb ?? '-'} ${addr.state ?? '-'} ${addr.country ?? '-'}`;
	    return formattedAddress;
	  }
	  return '-'; // Default value when no address data is available
	});

	// Date formatter composable
	

	const inputData = ref({
	  firstname: userData.value.firstname,
	  lastname: userData.value.lastname,
	  email: userData.value.email,
	  phone: userData.value.phone,
	  mobile: userData.value.mobile,
	  dob: userData.value.dob?formatDate(userData.value.dob):'',
	  address: address.value,
	});

	const successMessage = computed(() => {
	  return userStore.successResponse && !errorMessages.value.length ? userStore.successResponse : null;
	});

	const errorMessages = computed(() => {
	  if (userStore.errorResponseData && typeof userStore.errorResponseData === 'object') {
	    const errors = userStore.errorResponseData.message;
	    const formattedErrors: string[] = [];
	    for (const field in errors) {
	      if (Array.isArray(errors[field])) {
	        formattedErrors.push(...errors[field]);
	      }
	    }
	    return formattedErrors;
	  }
	  return [];
	});

	const showSuccess = ref(false);

	const triggerSuccessMessage = () => {
	  if (successMessage.value) {
	    showSuccess.value = true;
	    setTimeout(() => {
	      showSuccess.value = false;
	    }, 3000);
	  }
	};

	const editForm = () => {
	  isEdit.value = true;
	};

	const submitForm = async () => {
	  try {
	  	clearMessages();
	    const profileData = {
	      firstname: inputData.value.firstname,
	      lastname: inputData.value.lastname,
	      email: inputData.value.email,
	      phone: phone.value, // Use phone from composable
	      mobile: mobile.value, // Use mobile from composable
	      dob: inputData.value.dob?parseDate(inputData.value.dob):'',
	      address: inputData.value.address,
	    };

	    userStore.successResponse = null;
	    userStore.errorResponseData = null;

	    await userStore.updateProfile(profileData);
	    triggerSuccessMessage();
	    isEdit.value = false;
	  } catch (error) {
	    console.error(error);
	    
	    userStore.successResponse = null;
	  }
	};
	const clearMessages = () => {
	  userStore.successResponse = null;
	  userStore.errorResponseData = null;
	};
		
	return{
		userStore,
		isEdit,
		userData,
		address,
		inputData,
		handlePhoneInput,
		handleMobileInput,
		phone,
		mobile,
		phoneError,
		mobileError,
		successMessage,
		errorMessages,
		showSuccess,
		triggerSuccessMessage,
		editForm,
		submitForm,
		clearMessages
	}

  }

 });