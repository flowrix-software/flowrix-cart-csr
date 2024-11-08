import {defineComponent, defineAsyncComponent } from "vue";
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/AuthStore';
import { useTogglePassword } from '../../composables/useTooglePassword';
export default defineComponent({
  name: 'LoginScript',  
  setup() {
  		const router = useRouter();
		const authStore = useAuthStore();
		const checked = ref(false);
		const email = ref(null);
		const password = ref(null);
		const { showPassword, togglePassword } = useTogglePassword();
		const form_error = computed(() => {
		  return authStore.errorResponseData?.message || null;
		});

		const handleLogin = async (loginroute='Dashboard',tab='account') => {
		  try {
		    await authStore.login({ email: email.value ?? '', password: password.value ?? '' });
		    if (authStore.responseData.status === 'Success') {
		    	if(loginroute!='Checkout'){
		      router.push({ name: loginroute, params: { tab: "account" } });
		    	}else{
		    	}
		    }
		  } catch (error) {
		    console.error('Error', error);
		  }
		};
			
	return{
		email,
		showPassword,
		togglePassword,
		password,
		checked,
		form_error,
		handleLogin
	}

  }

 });