import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

export default function ScanScreen() {
  const navigation = useNavigation();
  const [scanning, setScanning] = useState(true);

  const onSuccess = e => {
    if (scanning) {
      setScanning(false);
      navigation.navigate('Home', { scannedData: e.data });
      Linking.openURL(e.data).catch(err => console.error('An error occurred', err));
      setTimeout(() => setScanning(true), 2000);
    }
  };

  return (
    <View style={styles.container}>
      
      <QRCodeScanner
        onRead={onSuccess}
        reactivate={scanning}
        reactivateTimeout={1000}
        cameraProps={{
          captureAudio: false,
          ratio: '16:9',
          autofocus: true,
        }}
        flashMode={RNCamera.Constants.FlashMode.auto}
        showMarker={true}
        markerStyle={{ borderColor: 'red', borderWidth: 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerText: {
    fontSize: 18,
    padding: 32,
    color: '#777',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
