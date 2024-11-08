import {defineComponent, defineAsyncComponent } from "vue";
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserstore } from '../../stores/Userstore';
import { useNumberInput } from '../../composables/useNumberOnly';

export default defineComponent({
  name: 'ShippingAddressScript',  
  setup() {
  	const showLightbox = ref(false)
  	const loading = ref(false);
		const userStore = useUserstore();
		const userAddress = computed (()=> userStore.user.addresses)

		const { errorMessage: newMobileError, handleInput: handleNewMobileInput } = useNumberInput();
		const { errorMessage: newPostcodeError, handleInput: handleNewPostcodeInput } = useNumberInput();
		const { errorMessage: editMobileError, handleInput: handleEditMobileInput } = useNumberInput();
		const { errorMessage: editPostcodeError, handleInput: handleEditPostcodeInput } = useNumberInput();

		const alertMessage = ref('');
		const alertType = ref('');
		const newShippingAddress = ref({
		  firstname: '',
		  lastname: '',
		  mobile: '',
		  saddress: '',
		  address:'',
		  country_id: 14, // Default country ID
		  suburb: '',
		  postcode: '',
		  state_id: ''
		});

		const currentAddress = ref({ country_id: 14 });
		const addNewAddress = ref(false);
		const addressToDelete = ref(null);

		const countries = ref([]);
		const states = ref(null);

		const clearMessages = () => {
		  userStore.successResponse = null;
		  userStore.errorResponseData = null;
		  alertMessage.value = '';
		};

		// Fetch countries and states data on component mount
		onMounted(async () => {
		  await userStore.getCountries();
		  if (userStore.countries.status === 'Success') {
		    countries.value = userStore.countries.data;
		    const australia = countries.value.find(country => country.id === 14);
		    if (australia) states.value = australia.states;
		  }
		});

		const handleAddAddress = async () => {
		  try {
		  	clearMessages();
		  	loading.value = true
		    userStore.new_address = '';
		    userStore.errorResponseData = '';
		    await userStore.addNewAddress(newShippingAddress.value);
		    if (userStore.new_address.status === 'Success') {
		      showAlert('Address added successfully!', 'success');
		      closeModal('addAddressModal');
		      newShippingAddress.value = {country_id:14}
		      
		    }
		  } catch {
		    showAlert('Error adding address.', 'error');
		  }
		  loading.value = false
		};

		const handleEditAddress = async () => {
		  try {
		  	clearMessages();
		  	loading.value = true
		    currentAddress.value.address = currentAddress.value.saddress;
		    await userStore.updateAddress(currentAddress.value);
		    if (userStore.update_address.status === 'Success') {
		      showAlert('Address updated successfully!', 'success');
		      loading.value = false
		      closeModal('editModal');
		    }
		  } catch {
		    showAlert('Error updating address.', 'error');
		  }
		  loading.value = false
		};

		const handleDeleteAddress = async () => {
		  if (!addressToDelete.value) return;
		  loading.value = true
		  try {
		    await userStore.deleteAddress({ id: addressToDelete.value });
		    if (userStore.delete_address.status === 'Success') {
		      showAlert('Address deleted successfully!', 'success');
		      closeModal('deleteModal');
		      loading.value = false
		    }
		  } catch {
		    showAlert('Error deleting address.', 'error');
		  }
		};

		// Show alert with a timeout
		const showAlert = (message, type) => {
		  alertMessage.value = message;
		  alertType.value = type;
		  setTimeout(() => (alertMessage.value = ''), 5000);
		};

		const editAddress = (address) => {
			clearMessages();
		  currentAddress.value = { ...address, saddress: address.address };
		  showLightbox.value=true
		};

		const openConfirmationModal = (addressId) => {
		  addressToDelete.value = addressId;
		};

		const handleDefaultAddress = async (address) => {
		  await userStore.defaultAddress(address);
		};

		// Function to close modal programmatically
		const closeModal = (modalId) => {
		  const modalElement = document.getElementById(modalId);
		  modalElement.querySelector('.btn-close').click();
		};
			
	return{
		userStore,
		userAddress,
		newShippingAddress,
		countries,
		states,
		clearMessages,
		handleAddAddress,
		handleEditAddress,
		handleDeleteAddress,
		showAlert,
		editAddress,
		openConfirmationModal,
		handleDefaultAddress,
		closeModal,
		currentAddress,
		showLightbox,
		newMobileError,
		newPostcodeError,
		editMobileError,
		editPostcodeError,
		alertMessage,
		loading
	}

  }

 });