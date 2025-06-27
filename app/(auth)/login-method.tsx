import { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { checkBiometricAuth } from '../../lib/biometricAuth';
import { isBiometricEnabled } from '../../lib/settingsStore';

export default function LoginMethod() {
  const router = useRouter();
  const [biometricAllowed, setBiometricAllowed] = useState(false);

  useEffect(() => {
    (async () => {
      const allowed = await isBiometricEnabled();
      setBiometricAllowed(allowed);
    })();
  }, []);

  const handleBiometric = async () => {
    const ok = await checkBiometricAuth();
    if (ok) {
      router.replace('/notes');
    } else {
      Alert.alert('Ошибка', 'Биометрическая аутентификация не удалась');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 20, marginBottom: 40 }}>Выберите способ входа</Text>

      <Pressable
        onPress={() => router.push('/pin-enter')}
        style={{
          backgroundColor: '#1E5EFF',
          paddingHorizontal: 32,
          paddingVertical: 14,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Войти по PIN</Text>
      </Pressable>

      {biometricAllowed && (
        <Pressable
          onPress={handleBiometric}
          style={{
            backgroundColor: '#444',
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Войти по Face ID / отпечатку</Text>
        </Pressable>
      )}
    </View>
  );
}
