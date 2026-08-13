import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export function AppHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.side} onPress={onBack}>
        <Text style={styles.back}>‹</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.side} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 62,
    backgroundColor: colors.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  side: { width: 42, alignItems: 'center' },
  back: { color: colors.white, fontSize: 38, lineHeight: 40 },
  title: { color: colors.white, fontSize: 18, fontWeight: '900' },
});
