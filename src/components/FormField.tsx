import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
};

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#929AA5"
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  input: {
    minHeight: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
    color: colors.text,
    fontSize: 16,
  },
  multiline: {
    minHeight: 98,
    textAlignVertical: 'top',
  },
});
