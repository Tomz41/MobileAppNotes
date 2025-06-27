import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'biometric_enabled';

export async function isBiometricEnabled(): Promise<boolean> {
  const value = await AsyncStorage.getItem(KEY);
  return value === 'true';
}

export async function setBiometricEnabled(enabled: boolean) {
  await AsyncStorage.setItem(KEY, enabled ? 'true' : 'false');
}
