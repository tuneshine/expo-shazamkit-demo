import { Button, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as ExpoShazamKit from 'expo-shazamkit';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';


export default function App() {
  const [expoShazamResult, setExpoShazamResult] = useState(null);
  const [expoShazamError, setExpoShazamError] = useState(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    // TODO: We will need to set a ShazamKit developer token on Android
    // but the API currently does not exist in the plugin
    if (Platform.OS === 'android') {
      // ExpoShazamKit.setDeveloperToken('DEVELOPER_TOKEN_HERE');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button title={listening ? 'Running Shazam' : 'Run Shazam'} onPress={async () => {
        setListening(true);
        setExpoShazamResult(null);
        setExpoShazamError(null);
        try {
          const shazamResult = await ExpoShazamKit.startListening();
          setExpoShazamResult(shazamResult);
        } catch (e) {
          setExpoShazamError(e);
        } finally {
          setListening(false);
        }
      }} />
      {listening && <Text>Listening...</Text>}
      {expoShazamResult && <Text style={styles.pre}>{JSON.stringify(expoShazamResult, null, 2)}</Text>}
      {expoShazamError && <Text style={[styles.pre, { color: 'red' }]}>{expoShazamError.message}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pre: {
    whiteSpace: 'pre',
    fontFamily: 'monospace',
  },
});
