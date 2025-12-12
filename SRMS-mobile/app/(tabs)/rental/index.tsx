import { ScannerView } from '@/components/ScannerView';
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function RentalPage() {
  const [key, setKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setKey(prev => prev + 1)
      return () => {};
    }, [])
  );

  return (
    <View key={key} style={styles.container}>
      <ScannerView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});