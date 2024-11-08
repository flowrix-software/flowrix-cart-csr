import {defineComponent, defineAsyncComponent } from "vue";
import { ref, computed,watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/AuthStore';
import { validatePassword, PasswordValidationResult } from '../../composables/passwordValidator';
import { useTogglePassword } from '../../composables/useTooglePassword'
export default defineComponent({
  name: 'ChangePasswordScript',  
  setup() {
  	const authStore = useAuthStore()
	const { showPassword, togglePassword } = useTogglePassword()

	const password_reset_success = ref<string | null>(null)
	const password_reset_failed = ref<any>(null)
	const loading = ref(false)
	const inputData = ref({
		current_password: '',
		password:'',
		password_confirmation: '',
		passwordStrengthValue:0
	})

	const checkPassword = () => {
      inputData.value.passwordStrengthValue = validatePassword(inputData.value.password);
    };

	const setNewPassword = async () => {
	  try {
	  	password_reset_success.value = ''
	  	password_reset_failed.value = ''
	  	loading.value=true
	    await authStore.changePassword({
	      password: inputData.value.password ?? '',
	      current_password: inputData.value.current_password ?? '',
	      password_confirmation: inputData.value.password_confirmation ?? ''
	    })
	    loading.value=false
	    if (authStore.changePasswordState.status === 'Success') {
	      password_reset_success.value = 'Password Reset Successfully'
	    }
	  } catch (error) {
	    password_reset_failed.value = authStore.errorResponseData
	  }
	}

	watch(
	  () => authStore.errorResponseData,
	  (error) => {
	    password_reset_failed.value = error.message
	  }
	)
			
	return{
		loading,
		checkPassword,
		authStore,
		showPassword,
		togglePassword,
		inputData,
		password_reset_success,
		password_reset_failed,
		setNewPassword
	}

  }

 });