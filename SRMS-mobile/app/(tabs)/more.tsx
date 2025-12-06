import { MoreSurface } from '@/components/more/MoreSurface';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MorePage() {
  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <MoreSurface />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
