import { useEffect, useState } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { getPin } from '../../lib/pinStore';
import { useRouter } from 'expo-router';
import PinInput from '../../components/PinInput';

export default function PinEnter() {
  const [input, setInput] = useState('');
  const [storedPin, setStoredPin] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const router = useRouter();

  useEffect(() => {
    getPin().then((pin) => {
      if (!pin) {
        router.replace('/pin-setup');
      } else {
        setStoredPin(pin);
      }
    });
  }, []);

  const handleSubmit = () => {
    if (input === storedPin) {
      router.replace('/notes'); // переход к приложению
    } else {
      const remaining = attemptsLeft - 1;
      setAttemptsLeft(remaining);
      setInput('');
      if (remaining <= 0) {
        Alert.alert('Блокировка', 'Слишком много неверных попыток');
      } else {
        Alert.alert('Ошибка', `Неверный PIN. Осталось попыток: ${remaining}`);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, color: 'white', marginBottom: 30 }}>Введите PIN-код</Text>

      <PinInput value={input} onChange={setInput} />

      <Pressable
        onPress={handleSubmit}
        style={{
          backgroundColor: '#1E5EFF',
          paddingHorizontal: 32,
          paddingVertical: 14,
          borderRadius: 12,
          marginTop: 40,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>ВОЙТИ</Text>
      </Pressable>
    </View>
  );
}
