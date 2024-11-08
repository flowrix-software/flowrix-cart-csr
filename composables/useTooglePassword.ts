// src/composables/useTogglePassword.ts
import { ref } from 'vue';

export function useTogglePassword() {
  const showPassword = ref('password');

  const togglePassword = () => {
    showPassword.value = showPassword.value=='password'?'text':'password';
  };

  return {
    showPassword,
    togglePassword
  };
}
