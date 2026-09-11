import { useFonts } from 'expo-font';

import { nunitoSansFonts } from '@/theme/fonts';

export function useAppFonts() {
  return useFonts(nunitoSansFonts);
}
