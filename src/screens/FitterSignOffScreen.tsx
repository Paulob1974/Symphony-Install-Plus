import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { ChoicePill } from '../components/ChoicePill';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { SignaturePad } from '../components/SignaturePad';
import { colors } from '../theme/colors';
import { CompletionStatus, InstallationReport } from '../types/report';

const STATUSES: CompletionStatus[] = ['Installation Completed', 'Completed with Issues', 'Unable to Complete'];

export function FitterSignOffScreen({
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
      <AppHeader title="Fitter Sign-Off" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressBar step={4} />
        <Text style={styles.title}>Complete the fitter sign-off</Text>

        <FormField label="Fitter Name" value={report.fitterName}
          onChangeText={v => setReport(r => ({ ...r, fitterName: v }))} placeholder="Fitter name" />

        <Text style={styles.label}>Completion Status</Text>
        <View style={styles.wrap}>
          {STATUSES.map(status => (
            <ChoicePill key={status} label={status} selected={report.completionStatus === status}
              onPress={() => setReport(r => ({ ...r, completionStatus: status }))} />
          ))}
        </View>

        <FormField label="Fitter Comments" value={report.fitterComments}
          onChangeText={v => setReport(r => ({ ...r, fitterComments: v }))}
          placeholder="Add completion notes or anything the office needs to know" multiline />

        <Text style={styles.label}>Fitter Signature</Text>
        <SignaturePad value={report.fitterSignature}
          onChange={sig => setReport(r => ({ ...r, fitterSignature: sig }))} />

        <PrimaryButton title="Next: Customer Sign-Off" onPress={onNext} />
        <PrimaryButton title="Save Draft" onPress={onSave} secondary />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 50 },
  title: { color: colors.text, fontSize: 23, fontWeight: '900', marginBottom: 20 },
  label: { color: colors.text, fontWeight: '800', fontSize: 13, marginBottom: 7 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 14 },
});
