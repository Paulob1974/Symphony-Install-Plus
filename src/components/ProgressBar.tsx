import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export function ProgressBar({ step }: { step: number }) {
  return (
    <View style={styles.row}>
      {[1,2,3,4,5,6].map(n => (
        <View key={n} style={[styles.circle, n <= step && styles.active]}>
          <Text style={[styles.text, n <= step && styles.activeText]}>{n}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  circle: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#D9DEE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: { backgroundColor: colors.red },
  text: { color: colors.muted, fontWeight: '800', fontSize: 12 },
  activeText: { color: colors.white },
});
