import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { InstallationReport } from '../types/report';

export function HomeScreen({
  onNewReport,
  draft,
  onContinueDraft,
}: {
  onNewReport: () => void;
  draft?: InstallationReport;
  onContinueDraft: () => void;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={require('../../assets/symphony-site.jpg')} style={styles.hero} resizeMode="cover" />
        <View style={styles.redRule} />

        <View style={styles.body}>
          <Text style={styles.brand}>Symphony</Text>
          <View style={styles.rule} />
          <Text style={styles.title}>Symphony Install+</Text>
          <Text style={styles.subtitle}>Retail Display Installation Report</Text>

          <Pressable style={styles.card} onPress={onNewReport}>
            <View style={styles.iconBox}><Text style={styles.icon}>＋</Text></View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>New Installation Report</Text>
              <Text style={styles.cardSub}>Start a blank installation report</Text>
            </View>
          </Pressable>

          {draft && (
            <Pressable style={styles.draftCard} onPress={onContinueDraft}>
              <Text style={styles.draftLabel}>SAVED DRAFT</Text>
              <Text style={styles.draftTitle}>
                {draft.jobNumber || draft.reportNumber}{draft.storeName ? ` — ${draft.storeName}` : ''}
              </Text>
              <Text style={styles.draftSub}>Tap to continue this report</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  content: { flexGrow: 1, backgroundColor: colors.white, paddingBottom: 36 },
  hero: { width: '100%', height: 260 },
  redRule: { height: 5, backgroundColor: colors.red },
  body: { padding: 24, alignItems: 'center' },
  brand: { color: colors.red, fontSize: 44, fontWeight: '300', marginTop: 8 },
  rule: { width: '100%', height: 1, backgroundColor: colors.border, marginVertical: 22 },
  title: { color: colors.navy, fontSize: 31, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: colors.muted, fontSize: 17, textAlign: 'center', marginTop: 7, marginBottom: 26 },
  card: {
    width: '100%', minHeight: 108, backgroundColor: colors.navy, borderRadius: 16,
    padding: 18, flexDirection: 'row', alignItems: 'center',
  },
  iconBox: {
    width: 58, height: 58, borderRadius: 12, borderWidth: 2, borderColor: colors.white,
    alignItems: 'center', justifyContent: 'center', marginRight: 15,
  },
  icon: { color: colors.white, fontSize: 34, fontWeight: '500' },
  cardText: { flex: 1 },
  cardTitle: { color: colors.white, fontSize: 18, fontWeight: '900' },
  cardSub: { color: '#D8E2EC', marginTop: 4, lineHeight: 19 },
  draftCard: {
    width: '100%', marginTop: 14, borderWidth: 1, borderColor: colors.border,
    borderRadius: 14, padding: 15, backgroundColor: colors.white,
  },
  draftLabel: { color: colors.red, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  draftTitle: { color: colors.text, fontSize: 16, fontWeight: '900', marginTop: 5 },
  draftSub: { color: colors.muted, marginTop: 3 },
});
