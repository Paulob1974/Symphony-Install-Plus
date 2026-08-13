import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { PhotoItem } from '../types/report';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  photos: PhotoItem[];
  onCamera: () => void;
  onLibrary: () => void;
  onRemove: (id: string) => void;
};

export function PhotoSection({ title, photos, onCamera, onLibrary, onRemove }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{photos.length}</Text>
      </View>

      {photos.length > 0 && (
        <View style={styles.grid}>
          {photos.map(photo => (
            <View key={photo.id} style={styles.thumbWrap}>
              <Image source={{ uri: photo.uri }} style={styles.thumb} />
              <Pressable style={styles.remove} onPress={() => onRemove(photo.id)}>
                <Text style={styles.removeText}>×</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}

      <View style={styles.actions}>
        <Pressable style={styles.action} onPress={onCamera}>
          <Text style={styles.actionText}>📷 Take Photo</Text>
        </Pressable>
        <Pressable style={styles.action} onPress={onLibrary}>
          <Text style={styles.actionText}>＋ Photos</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: colors.text, fontSize: 17, fontWeight: '900' },
  count: {
    minWidth: 28, height: 28, borderRadius: 14, backgroundColor: colors.navy,
    color: colors.white, textAlign: 'center', textAlignVertical: 'center',
    lineHeight: 28, fontWeight: '900',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  thumbWrap: { position: 'relative', marginRight: 8, marginBottom: 8 },
  thumb: { width: 86, height: 86, borderRadius: 9, backgroundColor: '#E8EBEF' },
  remove: {
    position: 'absolute', top: -5, right: -5, width: 24, height: 24, borderRadius: 12,
    backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center',
  },
  removeText: { color: colors.white, fontWeight: '900', fontSize: 18, lineHeight: 20 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 12 },
  action: {
    flex: 1, minHeight: 44, borderWidth: 1, borderColor: colors.red,
    borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  actionText: { color: colors.red, fontWeight: '800' },
});
