import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { colors } from '../theme/colors';
import { InstallationReport } from '../types/report';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export function ReviewScreen({
  report, onBack, onShare, onSave, onNew
}: {
  report: InstallationReport;
  onBack: () => void;
  onShare: () => void;
  onSave: () => void;
  onNew: () => void;
}) {
  const photoCount =
    report.beforePhotos.length +
    report.duringPhotos.length +
    report.completedPhotos.length +
    report.issues.reduce((sum, i) => sum + i.photos.length, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Review & Share" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressBar step={6} />
        <Text style={styles.title}>Check the report</Text>

        <View style={styles.card}>
          <Row label="Report" value={report.reportNumber} />
          <Row label="Job Number" value={report.jobNumber || 'Not entered'} />
          <Row label="Store / Site" value={report.storeName || 'Not entered'} />
          <Row label="Fitter" value={report.fitterName || 'Not entered'} />
          <Row label="Photos" value={String(photoCount)} />
          <Row label="Issues" value={String(report.issues.length)} />
          <Row label="Status" value={report.completionStatus} />
          <Row label="Fitter Signature" value={report.fitterSignature?.paths.length ? 'Captured' : 'Not captured'} />
          <Row label="Customer" value={report.customerName || 'Not entered'} />
          <Row label="Customer Signature" value={report.customerSignature?.paths.length ? 'Captured' : 'Not captured'} />
        </View>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            Create PDF & Share will generate the full Symphony Install+ report with job details,
            installation photos, issues, comments and both signatures, then open the phone's Share menu.
          </Text>
        </View>

        <PrimaryButton title="Create PDF & Share" onPress={onShare} />
        <PrimaryButton title="Save Draft" onPress={onSave} secondary />
        <PrimaryButton title="Start New Report" onPress={onNew} secondary />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 50 },
  title: { color: colors.text, fontSize: 23, fontWeight: '900', marginBottom: 18 },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EEF0F3' },
  rowLabel: { color: colors.text, fontWeight: '800', flex: 1 },
  rowValue: { color: colors.text, flex: 1, textAlign: 'right' },
  info: { backgroundColor: colors.paleBlue, borderRadius: 12, padding: 14, marginTop: 16 },
  infoText: { color: colors.navy, lineHeight: 20 },
});
