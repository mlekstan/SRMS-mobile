import { LoginForm } from "@/components/forms/LoginForm";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import { useRef } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Login() {
  const theme = useTheme();
  const headerHeight = useHeaderHeight();
  const { current: frHeaderHeight } = useRef(headerHeight); // first render header height

  return (
    <SafeAreaView
      edges={["left", "top", "right", "bottom", ]}
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <View>
        <Image 
          style={styles.image}
          contentFit="contain"
          source={require("@/assets/images/HEXAL_logo.svg")}
        />      
      </View>

      <Text variant="titleMedium" style={ styles.text }>
        Zaloguj się za pomocą swojego adresu e-mail.
      </Text>

      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={frHeaderHeight + 5}>
        <ScrollView>
          <View>
            <LoginForm />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: "auto",
    height: "100%"
  },
  text: {
    paddingTop: 50, 
    paddingBottom: 50, 
    textAlign: "center"
  },
  image: {
    height: 52
  }
});