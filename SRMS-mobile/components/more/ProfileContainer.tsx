import { User } from "@/api/types";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { UseQueryResult } from "@tanstack/react-query";
import { ScrollView, View } from "react-native";
import { Avatar, Divider, List } from "react-native-paper";


type ProfileContainerProps = {
  query: UseQueryResult<User, Error>
}


export function ProfileContainer({ query }: ProfileContainerProps) {
  const { data } = query;
  const initials = (data) ? (data.firstName[0] + data.lastName[0]) : "";

  return (
    <View style={{ height: "100%"}}>
      {
        (data) &&
        <>
          <Avatar.Text 
            size={100}
            label={initials}
            style={{ marginTop: 0, marginHorizontal: "auto" }}
          />

          <ProfileDataList data={data} />        
        </>
      }
    </View>
  );
}


function ProfileDataList({ data }: { data: User }) {
  const { t } = useTranslationContext();
  
  const profileDataList = [
    {
      title: t("profile.list.firstName"),
      description: data.firstName,
    },
    {
      title: t("profile.list.middleName"),
      description: data.middleName,
    },
    {
      title: t("profile.list.lastName"),
      description: data.lastName,
    },
    {
      title: t("profile.list.email"),
      description: data.email,
    },
    {
      title: t("profile.list.phoneNumber"),
      description: `+${data.areaCode ?? ""} ${data.phoneNumber ?? ""}`,
    },
    {
      title: t("profile.list.dateJoined"),
      description: data.dateJoined,
    },
  ];

  return (
    <ScrollView style={{ margin: 25 }} >
      <Divider />
      {
        profileDataList.map((item, idx) => (
          <View key={idx} >
            <List.Item 
              title={item.title}
              description={item.description}
            />
            <Divider />
          </View>
        ))
      }
    </ScrollView>
  );


}