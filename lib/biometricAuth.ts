import * as LocalAuthentication from 'expo-local-authentication';

export async function checkBiometricAuth(): Promise<boolean> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();

  if (hasHardware && enrolled) {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Войти с помощью Face ID / отпечатка',
      fallbackLabel: 'Использовать PIN',
    });
    return result.success;
  }
  return false;
}
