import { memo } from "react";
import { View } from "react-native";
import { Divider, List } from "react-native-paper";

type SettingsListRow = {
  title: string;
  icon: () => string;
  decription: () => string;
  onPress: () => void;
}

function SettingsList({ settingsList }: { settingsList: SettingsListRow[] }) {
  
  return (
    <View>
      <Divider />
      {
        settingsList.map((item, idx) => (
          <View key={idx} >
            <List.Item
              title={item.title}
              description={item.decription()}
              left={(props) => <List.Icon {...props} icon={item.icon()} />}
              onPress={() => item.onPress()}
            />
            <Divider />
          </View>
        ))
      }
    </View>    
  )
}

export default memo(SettingsList);