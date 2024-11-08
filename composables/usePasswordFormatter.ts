import { computed, Ref } from 'vue';

export function usePasswordFormat(password: Ref<string | null>,inputData) {
  const minLengthMedium = 8;
  const minLengthStrong = 10;
  const checkPasswordStrength = () => {
    const value = password ?? '';
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);

    let strength = 0;
    if (value.length >= minLengthStrong) strength += 2; // Strong password
    else if (value.length >= minLengthMedium) strength += 1; // Medium password
    if (hasUppercase) strength++;
    if (hasLowercase) strength++;
    if (hasNumber) strength++;
    if (hasSpecialChar) strength++;

    return strength;
  };

  const passwordStrength = computed(() => {
    const valueLength = (password ?? '').length;
    if (valueLength < minLengthMedium) return 'Password must be 8 characters';
    const strength = checkPasswordStrength();
    if (strength >= 4) return 'Strong';
    else if (strength === 3) return 'Medium';
    else return 'Weak';
  });

  const passwordStrengthClass = computed(() => {
    const valueLength = (password ?? '').length;
    if (valueLength < minLengthMedium) return 'bg-danger';
    const strength = checkPasswordStrength();
    if (strength >= 4) return 'bg-success';
    else if (strength === 3) return 'bg-warning';
    else return 'bg-danger';
  });

  const passwordStrengthValue = computed(() => {
    const valueLength = (password ?? '').length;

    if (valueLength < minLengthMedium) return 0;
    const strength = checkPasswordStrength();
    inputData.value.passwordStrengthValue = (strength / 6) * 100;
    return (strength / 6) * 100; // Adjusted to scale up to 100%
  });

  const passwordStrengthWidth = computed(() => {
    return `${passwordStrengthValue.value}%`;
  });

  // Compute the text color based on strength
  const passwordStrengthTextColor = computed(() => {
    const valueLength = (password ?? '').length;
    if (valueLength < minLengthMedium) return 'text-danger';
    const strength = checkPasswordStrength();
    if (strength >= 4) return 'text-success';
    else if (strength === 3) return 'text-black';
    else return 'text-danger';
  });

  return {
    passwordStrength,
    passwordStrengthClass,
    passwordStrengthValue,
    passwordStrengthWidth,
    passwordStrengthTextColor
  };
}
