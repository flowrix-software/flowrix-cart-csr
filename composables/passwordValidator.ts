// passwordValidator.ts

// Check if the password is at least 8 characters long
export const isLongEnough = (password: string): boolean => password.length >= 8;

// Check if the password contains at least one uppercase letter
export const hasUppercase = (password: string): boolean => /[A-Z]/.test(password);

// Check if the password contains at least one lowercase letter
export const hasLowercase = (password: string): boolean => /[a-z]/.test(password);

// Check if the password contains at least one number
export const hasNumber = (password: string): boolean => /[0-9]/.test(password);

// Check if the password contains at least one special character
export const hasSpecialChar = (password: string): boolean => /[@$!%*?&]/.test(password);

// Define the result type
type PasswordStrength = 'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong';

interface PasswordValidationResult {
    isValid: boolean;
    strength: PasswordStrength;
    checks: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        specialChar: boolean;
    };
}

// Compose all checks into a single function
export const validatePassword = (password: string): PasswordValidationResult => {
    const checks = {
        length: isLongEnough(password),
        uppercase: hasUppercase(password),
        lowercase: hasLowercase(password),
        number: hasNumber(password),
        specialChar: hasSpecialChar(password),
    };

    // Calculate strength based on the number of checks met
    const score = Object.values(checks).filter(Boolean).length/5*100;
    let strength: PasswordStrength;

    if (score === 5) {
        strength = 'Very Strong';
    } else if (score === 4) {
        strength = 'Strong';
    } else if (score === 3) {
        strength = 'Moderate';
    } else if (score === 2) {
        strength = 'Weak';
    } else {
        strength = 'Very Weak';
    }

    return { isValid: score === 100,score, strength, checks,length: isLongEnough(password),
        uppercase: hasUppercase(password),
        lowercase: hasLowercase(password),
        number: hasNumber(password),
        specialChar: hasSpecialChar(password) };
};