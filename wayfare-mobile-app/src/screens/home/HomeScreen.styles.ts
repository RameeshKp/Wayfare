import { StyleSheet } from 'react-native';

import { fontFamily } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  subtitle: {
    marginTop: 8,
    color: '#4b5563',
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  title: {
    color: '#111827',
    fontFamily: fontFamily.bold,
    fontSize: 32,
  },
});
