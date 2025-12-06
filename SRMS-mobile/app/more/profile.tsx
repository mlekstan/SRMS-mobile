import { apiClient } from "@/api/apiClientInstance";
import { HttpError } from "@/api/HttpError";
import { User } from "@/api/types";
import ErrorDialog from "@/components/ErrorDialog";
import { Loader } from "@/components/Loader";
import { ProfileContainer } from "@/components/more/ProfileContainer";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ProfilePage() {
  const router = useRouter();
  const { accessToken, signOut } = useAuthContext();
  const { t } = useTranslationContext();
  const query = useQuery({ 
    queryKey: ["user"], 
    queryFn: () => apiClient.makeRequest<User>("/users/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    }),
  });

  console.log(query.data);

  return (
    <SafeAreaView>
      {
        (query.data) &&
        <ProfileContainer query={query} />
      }
    
      {
        (query.isPending) &&
        <Loader />
      }

      {
        (query.isError) &&
        <ErrorDialog 
          messages={[query.error.message]}
          btnText={ t("components.errorDialog.button") }
          onClose={() => {
            const error = query.error;
            if (error instanceof HttpError && error.status === 401) {
              signOut();
            } else {
              router.back();
            }
          }}
        />
      }
    </SafeAreaView>
  );
}