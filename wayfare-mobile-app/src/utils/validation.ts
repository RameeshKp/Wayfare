export function getEmailError(email: string): string | undefined {
  if (email.trim().length === 0) {
    return 'Enter your email address.';
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return 'Enter a valid email address.';
  }

  return undefined;
}

export function getPasswordError(password: string): string | undefined {
  if (password.length === 0) {
    return 'Enter your password.';
  }

  if (password.length < 8) {
    return 'Use at least 8 characters.';
  }

  return undefined;
}
