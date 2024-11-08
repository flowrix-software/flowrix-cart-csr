import { ref } from 'vue';

export function useNumberInput() {
  const inputValue = ref('');
  const errorMessage = ref('');

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    // Sanitize the input value to only allow numbers
    const sanitizedValue = target.value.replace(/[^0-9]/g, '');
    if (sanitizedValue !== target.value) {
      errorMessage.value = 'Please enter numbers only.';
    } else {
      errorMessage.value = '';
    }
    // Update the input value
    inputValue.value = sanitizedValue;
    target.value = sanitizedValue; // Update the input field value
  };

  return {
    inputValue,
    errorMessage,
    handleInput,
  };
}
