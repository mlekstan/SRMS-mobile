import { CameraBox } from '@/components/CameraBox';
import { StyleSheet, View } from 'react-native';

export default function RentalPage() {
  return (
    <View style={styles.container}>
      <CameraBox />
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