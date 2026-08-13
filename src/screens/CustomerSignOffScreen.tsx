import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { SignaturePad } from '../components/SignaturePad';
import { colors } from '../theme/colors';
import { InstallationReport } from '../types/report';

export function CustomerSignOffScreen({
  report, setReport, onBack, onNext, onSave
}: {
  report: InstallationReport;
  setReport: React.Dispatch<React.SetStateAction<InstallationReport>>;
  onBack: () => void;
  onNext: () => void;
  onSave: () => void;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Customer Sign-Off" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressBar step={5} />
        <Text style={styles.title}>Customer acknowledgement</Text>
        <Text style={styles.sub}>The customer can add comments and sign directly on the phone.</Text>

        <FormField label="Customer Name" value={report.customerName}
          onChangeText={v => setReport(r => ({ ...r, customerName: v }))}
          placeholder="Customer / site representative" />

        <FormField label="Customer Comments" value={report.customerComments}
          onChangeText={v => setReport(r => ({ ...r, customerComments: v }))}
          placeholder="Customer comments, observations or confirmation" multiline />

        <Text style={styles.label}>Customer Signature</Text>
        <SignaturePad value={report.customerSignature}
          onChange={sig => setReport(r => ({ ...r, customerSignature: sig }))} />

        <PrimaryButton title="Review Report" onPress={onNext} />
        <PrimaryButton title="Save Draft" onPress={onSave} secondary />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 50 },
  title: { color: colors.text, fontSize: 23, fontWeight: '900' },
  sub: { color: colors.muted, lineHeight: 20, marginTop: 5, marginBottom: 20 },
  label: { color: colors.text, fontWeight: '800', fontSize: 13, marginBottom: 7 },
});
