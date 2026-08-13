import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { InstallationReport } from '../types/report';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { AppHeader } from '../components/AppHeader';

type Props = {
  report: InstallationReport;
  setReport: React.Dispatch<React.SetStateAction<InstallationReport>>;
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
};

export function JobDetailsScreen({ report, setReport, onNext, onBack, onSave }: Props) {
  const patch = (key: keyof InstallationReport, value: string) =>
    setReport(r => ({ ...r, [key]: value, updatedAt: new Date().toISOString() }));

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Job Details" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressBar step={1} />
        <Text style={styles.eyebrow}>REPORT {report.reportNumber}</Text>
        <Text style={styles.title}>Enter the job information</Text>

        <FormField label="Job Number / Reference" value={report.jobNumber}
          onChangeText={v => patch('jobNumber', v)} placeholder="e.g. 10452" />
        <FormField label="Store / Site Name" value={report.storeName}
          onChangeText={v => patch('storeName', v)} placeholder="e.g. Manchester Branch" />
        <FormField label="Site Address" value={report.siteAddress}
          onChangeText={v => patch('siteAddress', v)} placeholder="Full installation address" multiline />
        <FormField label="Site Contact Name (optional)" value={report.contactName}
          onChangeText={v => patch('contactName', v)} placeholder="Customer/site contact" />
        <FormField label="Installation Date" value={report.installationDate}
          onChangeText={v => patch('installationDate', v)} />
        <FormField label="Fitter Name" value={report.fitterName}
          onChangeText={v => patch('fitterName', v)} placeholder="Fitter completing this report" />

        <PrimaryButton title="Next: Installation Photos" onPress={onNext} />
        <PrimaryButton title="Save Draft" onPress={onSave} secondary />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 50 },
  eyebrow: { color: colors.red, fontSize: 12, fontWeight: '900', letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 23, fontWeight: '900', marginTop: 5, marginBottom: 22 },
});
