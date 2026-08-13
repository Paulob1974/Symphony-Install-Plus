import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HomeScreen } from './src/screens/HomeScreen';
import { JobDetailsScreen } from './src/screens/JobDetailsScreen';
import { PhotosScreen } from './src/screens/PhotosScreen';
import { IssuesScreen } from './src/screens/IssuesScreen';
import { FitterSignOffScreen } from './src/screens/FitterSignOffScreen';
import { CustomerSignOffScreen } from './src/screens/CustomerSignOffScreen';
import { ReviewScreen } from './src/screens/ReviewScreen';

import { createBlankReport, InstallationReport } from './src/types/report';
import { createAndSharePdf } from './src/utils/pdf';

type Screen = 'home' | 'job' | 'photos' | 'issues' | 'fitter' | 'customer' | 'review';
const DRAFT_KEY = 'symphony-install-plus-draft-v1';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [report, setReport] = useState<InstallationReport>(createBlankReport());
  const [draft, setDraft] = useState<InstallationReport | undefined>();

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(DRAFT_KEY);
      if (raw) {
        try { setDraft(JSON.parse(raw)); } catch {}
      }
    })();
  }, []);

  const startNew = () => {
    setReport(createBlankReport());
    setScreen('job');
  };

  const saveDraft = async () => {
    const next = { ...report, updatedAt: new Date().toISOString() };
    setReport(next);
    setDraft(next);
    await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(next));
    Alert.alert('Draft saved', 'This report has been saved on this device.');
  };

  const continueDraft = () => {
    if (!draft) return;
    setReport(draft);
    setScreen('job');
  };

  const share = async () => {
    await createAndSharePdf(report);
  };

  return (
    <>
      <StatusBar style={screen === 'home' ? 'dark' : 'light'} />

      {screen === 'home' && (
        <HomeScreen
          onNewReport={startNew}
          draft={draft}
          onContinueDraft={continueDraft}
        />
      )}

      {screen === 'job' && (
        <JobDetailsScreen
          report={report}
          setReport={setReport}
          onBack={() => setScreen('home')}
          onNext={() => setScreen('photos')}
          onSave={saveDraft}
        />
      )}

      {screen === 'photos' && (
        <PhotosScreen
          report={report}
          setReport={setReport}
          onBack={() => setScreen('job')}
          onNext={() => setScreen('issues')}
          onSave={saveDraft}
        />
      )}

      {screen === 'issues' && (
        <IssuesScreen
          report={report}
          setReport={setReport}
          onBack={() => setScreen('photos')}
          onNext={() => setScreen('fitter')}
          onSave={saveDraft}
        />
      )}

      {screen === 'fitter' && (
        <FitterSignOffScreen
          report={report}
          setReport={setReport}
          onBack={() => setScreen('issues')}
          onNext={() => setScreen('customer')}
          onSave={saveDraft}
        />
      )}

      {screen === 'customer' && (
        <CustomerSignOffScreen
          report={report}
          setReport={setReport}
          onBack={() => setScreen('fitter')}
          onNext={() => setScreen('review')}
          onSave={saveDraft}
        />
      )}

      {screen === 'review' && (
        <ReviewScreen
          report={report}
          onBack={() => setScreen('customer')}
          onShare={share}
          onSave={saveDraft}
          onNew={startNew}
        />
      )}
    </>
  );
}
