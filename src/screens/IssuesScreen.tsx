import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { ChoicePill } from '../components/ChoicePill';
import { FormField } from '../components/FormField';
import { PhotoSection } from '../components/PhotoSection';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { colors } from '../theme/colors';
import { InstallationReport, IssuePriority, ReportIssue } from '../types/report';
import { pickPhoto } from '../utils/photo';

const TYPES = ['Damaged Item', 'Missing Item', 'Incorrect Item', 'Site Issue', 'Installation Issue', 'Other'];
const PRIORITIES: IssuePriority[] = ['Low', 'Medium', 'High'];

export function IssuesScreen({
  report, setReport, onBack, onNext, onSave
}: {
  report: InstallationReport;
  setReport: React.Dispatch<React.SetStateAction<InstallationReport>>;
  onBack: () => void;
  onNext: () => void;
  onSave: () => void;
}) {
  const addIssue = () => {
    const issue: ReportIssue = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type: 'Damaged Item',
      priority: 'Medium',
      description: '',
      actionTaken: '',
      outstanding: true,
      photos: [],
    };
    setReport(r => ({ ...r, issues: [...r.issues, issue] }));
  };

  const patchIssue = (id: string, patch: Partial<ReportIssue>) =>
    setReport(r => ({
      ...r,
      issues: r.issues.map(i => i.id === id ? { ...i, ...patch } : i),
      updatedAt: new Date().toISOString(),
    }));

  const removeIssue = (id: string) =>
    setReport(r => ({ ...r, issues: r.issues.filter(i => i.id !== id) }));

  const addIssuePhoto = async (issue: ReportIssue, camera: boolean) => {
    const picked = await pickPhoto(camera);
    if (picked.length) patchIssue(issue.id, { photos: [...issue.photos, ...picked] });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Issues" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressBar step={3} />
        <Text style={styles.title}>Report problems or remedials</Text>
        <Text style={styles.sub}>Add a separate issue for each problem found on site.</Text>

        {report.issues.map((issue, index) => (
          <View key={issue.id} style={styles.issueCard}>
            <View style={styles.topRow}>
              <Text style={styles.issueTitle}>Issue {index + 1}</Text>
              <Pressable onPress={() => removeIssue(issue.id)}>
                <Text style={styles.remove}>Remove</Text>
              </Pressable>
            </View>

            <Text style={styles.label}>Issue Type</Text>
            <View style={styles.wrap}>
              {TYPES.map(type => (
                <ChoicePill key={type} label={type} selected={issue.type === type}
                  onPress={() => patchIssue(issue.id, { type })} />
              ))}
            </View>

            <Text style={styles.label}>Priority</Text>
            <View style={styles.wrap}>
              {PRIORITIES.map(priority => (
                <ChoicePill key={priority} label={priority} selected={issue.priority === priority}
                  onPress={() => patchIssue(issue.id, { priority })} />
              ))}
            </View>

            <FormField label="Description" value={issue.description}
              onChangeText={v => patchIssue(issue.id, { description: v })}
              placeholder="Describe the issue" multiline />

            <FormField label="Action Taken" value={issue.actionTaken}
              onChangeText={v => patchIssue(issue.id, { actionTaken: v })}
              placeholder="What was done on site?" multiline />

            <Text style={styles.label}>Is this still outstanding?</Text>
            <View style={styles.wrap}>
              <ChoicePill label="Yes" selected={issue.outstanding}
                onPress={() => patchIssue(issue.id, { outstanding: true })} />
              <ChoicePill label="No" selected={!issue.outstanding}
                onPress={() => patchIssue(issue.id, { outstanding: false })} />
            </View>

            <PhotoSection
              title="Issue Photos"
              photos={issue.photos}
              onCamera={() => addIssuePhoto(issue, true)}
              onLibrary={() => addIssuePhoto(issue, false)}
              onRemove={id => patchIssue(issue.id, { photos: issue.photos.filter(p => p.id !== id) })}
            />
          </View>
        ))}

        <PrimaryButton title="+ Add Issue" onPress={addIssue} secondary />
        <PrimaryButton title="Next: Fitter Sign-Off" onPress={onNext} />
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
  issueCard: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 15, padding: 14, marginBottom: 16,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  issueTitle: { color: colors.navy, fontSize: 18, fontWeight: '900', marginBottom: 12 },
  remove: { color: colors.red, fontWeight: '800' },
  label: { color: colors.text, fontWeight: '800', fontSize: 13, marginBottom: 7 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
});
