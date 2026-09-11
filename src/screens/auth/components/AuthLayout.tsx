import type { ReactNode } from 'react';

import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuSVGComponent } from '@/assets/svg/MenuSVGComponent';
import { Toast } from '@/components/ui/Toast';

import { styles } from './AuthLayout.styles';

import type { Toast as ToastData } from '@/hooks/useToast';

type AuthLayoutProps = {
  children: ReactNode;
  footerActionLabel: string;
  footerContent: ReactNode;
  footerPrompt: string;
  onFooterAction: () => void;
  subtitle: string;
  title: string;
  toast: ToastData | undefined;
};

export function AuthLayout({
  children,
  footerActionLabel,
  footerContent,
  footerPrompt,
  onFooterAction,
  subtitle,
  title,
  toast,
}: AuthLayoutProps) {
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" style={styles.screen}>
          <View>
            <View style={styles.header}>
              <View accessibilityLabel="Wayfare" accessible style={styles.mark}>
                <MenuSVGComponent />
              </View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            {children}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          {footerContent}
          <View style={styles.footerAccount}>
            <Text style={styles.footerText}>{footerPrompt} </Text>
            <Pressable accessibilityRole="button" onPress={onFooterAction}>
              <Text style={styles.footerLink}>{footerActionLabel}</Text>
            </Pressable>
          </View>
        </View>
        <Toast toast={toast} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
