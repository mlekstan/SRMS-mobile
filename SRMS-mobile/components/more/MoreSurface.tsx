import { useAuthContext } from "@/hooks/useAuthContext";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Icon, Surface, Text, useTheme } from "react-native-paper";


function useRows() {
  const theme = useTheme();
  const { t, lang } = useTranslationContext();
  const router = useRouter();
  const { signOut }= useAuthContext();
  const rows = useMemo(() => (
    [
      {
        icon: "cogs",
        iconColor: "",
        title: t("more.settings"),
        titleColor: "",
        chevron: true,
        onPress: () => {
          router.navigate("/more/settings");
        }
      },
      {
        icon: "account-circle-outline",
        iconColor: "",
        title: t("more.profile"),
        titleColor: "",
        chevron: true,
        onPress: () => {
          router.navigate("/more/profile");
        }
      },
      {
        icon: "information-slab-circle-outline",
        iconColor: "",
        title: t("more.about"),
        titleColor: "",
        chevron: true,
        onPress: () => {
          router.navigate("/more/about");
        }
      },
      {
        icon: "logout",
        iconColor: theme.colors.error,
        title: t("more.signOut"),
        titleColor: theme.colors.error,
        chevron: false,
        onPress: () => {
          signOut();
        }
      }
    ]
  ), [theme, lang]);

  return rows;
}

export function MoreSurface() {
  const rows = useRows();
  const theme = useTheme();

  return (
    <Surface 
      style={[styles.surface, { backgroundColor: theme.colors.elevation.level1, borderRadius: theme.roundness }]} 
      elevation={1}
    >
      {
        rows.map((row, idx) => (
          <View key={idx} >
            <View style={styles.row} onTouchEnd={() => row.onPress()} >
              <Icon
                source={row.icon}
                size={24}
                color={row.iconColor}
              />

              <Text variant="titleMedium" style={[styles.text, { color: row.titleColor }]}>
                { row.title }
              </Text>

              <View style={[styles.right]}>
                {
                  (row.chevron) &&
                  <Icon 
                    source="chevron-right"
                    size={24}
                  />
                }
              </View>
            </View>
            <Divider />        
          </View>
        ))
      }
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    height: "auto",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20
  },
  text: {
   marginLeft: 25,
  },
  right: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "flex-end"
  }
});