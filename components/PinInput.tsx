import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Keyboard } from 'react-native';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function PinInput({ value, onChange }: Props) {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  // Автоматический фокус при загрузке
  useEffect(() => {
    const show = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
    return () => clearTimeout(show);
  }, []);

  return (
    <Pressable onPress={handlePress} style={styles.wrapper}>
      <View style={styles.container}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={styles.circle}>
            <Text style={styles.digit}>{value[i] ? '•' : ''}</Text>
          </View>
        ))}
      </View>

      {/* Видимый, но прозрачный инпут */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => {
          if (text.length <= 4 && /^\d*$/.test(text)) {
            onChange(text);
          }
        }}
        keyboardType="numeric"
        style={styles.input}
        maxLength={4}
        caretHidden
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  container: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digit: {
    color: 'white',
    fontSize: 28,
  },
  input: {
    position: 'absolute',
    top: 0,
    width: 200, // достаточно, чтобы тап регистрировался
    height: 50,
    opacity: 0,
  },
});
