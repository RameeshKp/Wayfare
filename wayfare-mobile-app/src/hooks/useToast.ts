import { useEffect, useState } from 'react';

export type Toast = {
  message: string;
  variant: 'error' | 'success';
};

const toastDuration = 3500;

export function useToast() {
  const [toast, setToast] = useState<Toast | undefined>(undefined);

  useEffect(() => {
    if (toast === undefined) {
      return undefined;
    }

    const timer = setTimeout(() => setToast(undefined), toastDuration);

    return () => clearTimeout(timer);
  }, [toast]);

  function showToast(message: string, variant: Toast['variant']) {
    setToast({ message, variant });
  }

  return { showToast, toast };
}
