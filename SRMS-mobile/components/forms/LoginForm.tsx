import { View } from "react-native";
import ErrorDialog from "../ErrorDialog";
import { Loader } from "../Loader";
import { LoginFormFields } from "./LoginFormFields";
import { useLoginForm } from "./useLoginForm";


export function LoginForm() {
  const { form, mutation, t } = useLoginForm();

  return (
    <View>
      <LoginFormFields form={form} t={t} />
      {
        (mutation.isPending) &&
        <Loader />
      }

      {
        (mutation.isError) &&
        <ErrorDialog 
          messages={[mutation.error.message]}
          btnText={t("components.errorDialog.button")}
          onClose={() => mutation.reset()}
        />
      }
    </View>
  );
}