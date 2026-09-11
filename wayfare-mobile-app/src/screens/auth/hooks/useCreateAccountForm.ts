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

  function submit() {
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

      return;
    }

    createAccount({ email: email.trim().toLowerCase(), password });
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    showToast('Your account has been created. You can now log in.', 'success');
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
