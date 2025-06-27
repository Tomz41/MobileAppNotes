import { useEffect, useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { isBiometricEnabled, setBiometricEnabled } from '../lib/settingsStore';

export default function Settings() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const current = await isBiometricEnabled();
      setEnabled(current);
    })();
  }, []);

  const toggleSwitch = async () => {
    await setBiometricEnabled(!enabled);
    setEnabled(!enabled);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 20, marginBottom: 20, marginTop: 30  }}>Настройки</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Вход по биометрии</Text>
        <Switch
          value={enabled}
          onValueChange={toggleSwitch}
          thumbColor={enabled ? '#1E5EFF' : '#888'}
        />
      </View>
    </View>
  );
}
