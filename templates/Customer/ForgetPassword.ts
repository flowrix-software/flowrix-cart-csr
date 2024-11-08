import {defineComponent, defineAsyncComponent } from "vue";
import { ref, computed } from 'vue';
import { useAuthStore } from '../../stores/AuthStore';
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ForgetPasswordScript',  
  setup() {
  	const router = useRouter();
	const authStore = useAuthStore();
	const email = ref(null);
	const token = ref(null);
	const new_password = ref(null);
	const confirm_password = ref(null);
	const verified_token = ref(null);

	const verifyEmailField = ref(true);
	const verifyTokenField = ref(false);
	const setNewPasswordField = ref(false);
	const password_error_message = ref(null); 
	const isEmailVerified = ref(false); // Flag to track email verification status

	// Computed properties for error messages
	const emailErrorMessage = computed(() => {
	  return authStore.errorResponseData.message?.email?.[0] || null;
	});

	const tokenErrorMessage = computed(() => {
	  return authStore.errorResponseData.message?.token?.[0] || null;
	});

	// Functions
	const verifyEmailRequest = async () => {
	  try {
	    await authStore.verifyEmail({ email: email.value });
	    if (authStore.verifyEmailState.status === 'Success') {
	      verifyEmailField.value = false;
	      verifyTokenField.value = true;
	      isEmailVerified.value = true; 
	    }
	  } catch (error) {
	    console.error('Error during email verification', error);
	  }
	};

	const verifyTokenRequest = async () => {
	  try {
	    await authStore.verifyToken({ email: email.value, token: token.value });
	    if (authStore.verifyTokenState.status === 'Success') {
	      verified_token.value = authStore.verifyTokenState.data;
	      verifyTokenField.value = false;
	      setNewPasswordField.value = true;
	    }
	  } catch (error) {
	    console.error('Error during token verification', error);
	  }
	};

	const setNewPassword = async (options) => {
	  if (new_password.value !== confirm_password.value) {
	    password_error_message.value = 'New and confirm password must be matched'; // Set error message
	    return;
	  }
	  try {
	    await authStore.resetPassword({ token: verified_token.value, password: new_password.value, password_confirmation: confirm_password.value });
	    if (authStore.setNewPasswordState.status === 'Success') {
	      setNewPasswordField.value = false;
	      router.push({ name: options.router });
	    }
	  } catch (error) {
	    console.error('Error during password reset', error);
	  }
	};
  		
			
	return{
		verifyEmailField,
		verifyEmailRequest,
		email,
		emailErrorMessage,
		verifyTokenField,
		isEmailVerified,
		authStore,
		token,
		verifyTokenRequest,
		tokenErrorMessage,
		setNewPasswordField,
		setNewPassword,
		new_password,
		confirm_password,
		password_error_message
	}

  }

 });