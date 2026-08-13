import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { PhotoSection } from '../components/PhotoSection';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { colors } from '../theme/colors';
import { InstallationReport, PhotoItem } from '../types/report';
import { pickPhoto } from '../utils/photo';

type Key = 'beforePhotos' | 'duringPhotos' | 'completedPhotos';

export function PhotosScreen({
  report, setReport, onBack, onNext, onSave
}: {
  report: InstallationReport;
  setReport: React.Dispatch<React.SetStateAction<InstallationReport>>;
  onBack: () => void;
  onNext: () => void;
  onSave: () => void;
}) {
  const add = async (key: Key, camera: boolean) => {
    const picked = await pickPhoto(camera);
    if (!picked.length) return;
    setReport(r => ({ ...r, [key]: [...r[key], ...picked], updatedAt: new Date().toISOString() }));
  };

  const remove = (key: Key, id: string) =>
    setReport(r => ({ ...r, [key]: r[key].filter(p => p.id !== id), updatedAt: new Date().toISOString() }));

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Installation Photos" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressBar step={2} />
        <Text style={styles.title}>Record the installation</Text>
        <Text style={styles.sub}>Add as many photos as needed. They will appear in the final PDF.</Text>

        <PhotoSection title="Before Installation" photos={report.beforePhotos}
          onCamera={() => add('beforePhotos', true)} onLibrary={() => add('beforePhotos', false)}
          onRemove={id => remove('beforePhotos', id)} />

        <PhotoSection title="During Installation" photos={report.duringPhotos}
          onCamera={() => add('duringPhotos', true)} onLibrary={() => add('duringPhotos', false)}
          onRemove={id => remove('duringPhotos', id)} />

        <PhotoSection title="Completed Installation" photos={report.completedPhotos}
          onCamera={() => add('completedPhotos', true)} onLibrary={() => add('completedPhotos', false)}
          onRemove={id => remove('completedPhotos', id)} />

        <PrimaryButton title="Next: Issues" onPress={onNext} />
        <PrimaryButton title="Save Draft" onPress={onSave} secondary />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 50 },
  title: { color: colors.text, fontSize: 23, fontWeight: '900' },
  sub: { color: colors.muted, lineHeight: 20, marginTop: 5, marginBottom: 18 },
});
