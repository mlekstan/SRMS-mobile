import { View } from "react-native";
import { ActivityIndicator, Portal, useTheme } from "react-native-paper";


export function Loader() {
  const theme = useTheme();

  return (
    <Portal>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.backdrop
        }}
      >
        <ActivityIndicator animating={true} size="large" />
      </View>
    </Portal>
  )
}