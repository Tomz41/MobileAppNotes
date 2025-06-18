import * as SecureStore from 'expo-secure-store';

const PIN_KEY = 'user_pin';

export async function savePin(pin: string) {
  await SecureStore.setItemAsync(PIN_KEY, pin);
}

export async function getPin(): Promise<string | null> {
  return await SecureStore.getItemAsync(PIN_KEY);
}
