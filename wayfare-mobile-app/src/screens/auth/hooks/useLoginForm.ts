import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { getEmailError, getPasswordError } from '@/utils/validation';

type LoginErrors = {
  email?: string;
  password?: string;
};

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const { login } = useAuth();
  const { showToast, toast } = useToast();

  function submit() {
    const nextErrors = {
      email: getEmailError(email),
      password: getPasswordError(password),
    };

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      showToast(nextErrors.email ?? nextErrors.password ?? 'Check your details and try again.', 'error');
      return;
    }

    const loginResult = login({ email: email.trim().toLowerCase(), password });

    if (loginResult === 'noAccount') {
      showToast('Create an account before logging in.', 'error');
      return;
    }

    if (loginResult === 'invalidCredentials') {
      showToast('Your email or password is incorrect.', 'error');
      return;
    }

    setEmail('');
    setPassword('');
    setErrors({});
    showToast('Welcome back. Your trip planner is ready.', 'success');
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
