import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  danger?: boolean;
};

export function PrimaryButton({ title, onPress, secondary, danger }: Props) {
  return (
    <Pressable
      style={[
        styles.button,
        secondary && styles.secondary,
        danger && styles.danger,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, secondary && styles.secondaryText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginTop: 12,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.red,
  },
  danger: {
    backgroundColor: '#9B1C1C',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryText: {
    color: colors.red,
  },
});
