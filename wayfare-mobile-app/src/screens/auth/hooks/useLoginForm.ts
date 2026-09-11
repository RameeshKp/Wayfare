import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { getEmailError, getPasswordError } from '@/utils/validation';

type LoginErrors = {
  email?: string;
  password?: string;
};

export function useLoginForm(successMessage?: string) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const { login } = useAuth();
  const { showToast, toast } = useToast();

  useEffect(() => {
    if (successMessage) {
      showToast(successMessage, 'success');
    }
  }, [showToast, successMessage]);

  async function submit(): Promise<boolean> {
    const nextErrors = {
      email: getEmailError(email),
      password: getPasswordError(password),
    };

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      showToast(nextErrors.email ?? nextErrors.password ?? 'Check your details and try again.', 'error');
      return false;
    }

    const loginResult = await login({ email: email.trim().toLowerCase(), password });

    if (loginResult === 'noAccount') {
      showToast('Create an account before logging in.', 'error');
      return false;
    }

    if (loginResult === 'invalidCredentials') {
      showToast('Your email or password is incorrect.', 'error');
      return false;
    }

    if (loginResult === 'storageError') {
      showToast('We could not save your signed-in session. Please try again.', 'error');
      return false;
    }

    setEmail('');
    setPassword('');
    setErrors({});
    showToast('Welcome back. Your trip planner is ready.', 'success');
    return true;
  }

  function requestPasswordReset() {
    const emailError = getEmailError(email);

    if (emailError) {
      setErrors({ email: emailError });
      showToast(emailError, 'error');
      return;
    }

    setErrors({});
    showToast('A password-reset link has been sent to your email.', 'success');
  }

  return {
    email,
    errors,
    password,
    requestPasswordReset,
    setEmail,
    setPassword,
    submit,
    toast,
  };
}
