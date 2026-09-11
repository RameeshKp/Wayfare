import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { getEmailError, getPasswordError } from '@/utils/validation';

type CreateAccountErrors = {
  confirmPassword?: string;
  email?: string;
  password?: string;
};

export function useCreateAccountForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<CreateAccountErrors>({});
  const { createAccount } = useAuth();
  const { showToast, toast } = useToast();

  async function submit(): Promise<boolean> {
    const passwordError = getPasswordError(password);
    const nextErrors = {
      email: getEmailError(email),
      password: passwordError,
      confirmPassword:
        confirmPassword.length === 0
          ? 'Confirm your password.'
          : passwordError === undefined && confirmPassword !== password
            ? 'Passwords do not match.'
            : undefined,
    };

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password || nextErrors.confirmPassword) {
      const toastError =
        nextErrors.email ??
        nextErrors.password ??
        (nextErrors.confirmPassword === 'Passwords do not match.'
          ? undefined
          : nextErrors.confirmPassword);

      if (toastError) {
        showToast(toastError, 'error');
      }

      return false;
    }

    const accountWasSaved = await createAccount({ email: email.trim().toLowerCase(), password });

    if (!accountWasSaved) {
      showToast('We could not save your account. Please try again.', 'error');
      return false;
    }

    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    return true;
  }

  return {
    confirmPassword,
    email,
    errors,
    password,
    setConfirmPassword,
    setEmail,
    setPassword,
    submit,
    toast,
  };
}
