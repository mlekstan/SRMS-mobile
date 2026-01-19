import { useTranslationContext } from "@/hooks/useTranslationContext";
import { CommonActions } from "@react-navigation/native";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { BottomNavigation, Icon, Text, useTheme } from "react-native-paper";

export default function TabLayout() {
  const theme = useTheme();
  const { t } = useTranslationContext();

  return (
    <Tabs
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          shifting={true}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) =>
            descriptors[route.key].options.tabBarIcon?.({
              focused,
              color,
              size: 24
            }) || null
          }
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : typeof options.title === 'string'
                ? options.title
                : route.name;

            return label;
          }}
        />
      )}
    >
      <Tabs.Screen
        name="index"
        redirect
        options={{
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="rental"
        options={{
          title: t("rental.header"),
          tabBarIcon: ({ color }) => (
            <Icon source="clock-start" color={color} size={24} />
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: theme.colors.onPrimary
          },
          headerStyle: {
            backgroundColor: theme.colors.primary
          }       
        }}
      />

      <Tabs.Screen 
        name="return"
        options={{
          title: t("return.header"),
          tabBarIcon: ({ color }) => (
            <Icon source="clock-end" color={color} size={24} />
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: theme.colors.onPrimary
          },
          headerStyle: {
            backgroundColor: theme.colors.primary
          }
        }}
      />

      <Tabs.Screen 
        name="more"
        options={{
          tabBarLabel: t("more.header"),
          tabBarIcon: ({ color }) => (
            <Icon source="more" color={color} size={24} />
          ),
          headerLeft: () => (
            <Image 
              source={require("@/assets/images/HEXAL_logo_X.svg")}
              contentFit="contain"
              style={{
                marginLeft: 40,
                height: 85,
                width: 85
              }}
            />
          ),
          headerRight: () => (
            <Text 
              style={{color: theme.colors.onPrimary, marginRight: 40}} 
              variant="titleMedium"
            >
              v0.0.1
            </Text>
          ),
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 130
          },
        }}
      />
    </Tabs>
  );
}