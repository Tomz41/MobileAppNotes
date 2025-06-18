import { useState } from 'react';
import { View, Text, Button, Alert, Pressable } from 'react-native';
import { savePin } from '../../lib/pinStore';
import { useRouter } from 'expo-router';
import PinInput from '../../components/PinInput';

export default function PinSetup() {
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const router = useRouter();

  const handleNext = () => {
    if (pin.length !== 4) {
      Alert.alert('Ошибка', 'Введите 4 цифры');
      return;
    }
    setStep(2);
  };

  const handleSave = async () => {
    if (confirm !== pin) {
      Alert.alert('Ошибка', 'PIN-коды не совпадают');
      return;
    }
    await savePin(pin);
    router.replace('/pin-enter');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, color: 'white', marginBottom: 30 }}>
        {step === 1 ? 'Придумайте PIN-код' : 'Повторите PIN-код'}
      </Text>

      <PinInput value={step === 1 ? pin : confirm} onChange={step === 1 ? setPin : setConfirm} />

      <Pressable
        onPress={step === 1 ? handleNext : handleSave}
        style={{
          backgroundColor: '#1E5EFF',
          paddingHorizontal: 32,
          paddingVertical: 14,
          borderRadius: 12,
          marginTop: 40,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>ПРОДОЛЖИТЬ</Text>
      </Pressable>
    </View>
  );
}
