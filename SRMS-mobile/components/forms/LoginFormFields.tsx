import { View } from "react-native";
import FromSubmitButton from "./FormSubmitButton";


export function LoginFormFields({ form, t }: any) {
  
  return (
    <form.AppForm>
      <View>
        <form.AppField
          name="email"
          validators={{
            onChange: ({value}) => {
              if (!value) {
                return t("components.form.login.email.error.empty");
              }
              if (!value.includes("@")) {
                return t("components.form.login.email.error.invalid");
              }
            } 
          }}
        >
          {
            (field) => 
              <field.FormTextField
                label={ t("components.form.login.email.label") }
                keyboardType="email-address"
                autoComplete="email"
              />
          }
        </form.AppField>

        <form.AppField
          name="password"
          validators={{
            onChange: ({value}) => {
              if (!value) {
                return t("components.form.login.password.error.empty");
              }

              if (value.length < 5) {
                return t("components.form.login.password.error.tooShort");
              }
            }
          }}
        >
          {
            (field) => 
              <field.FormTextField 
                label={ t("components.form.login.password.label") }
                autoComplete="password"
                togglePasswordBtn={true}
              />
          }
        </form.AppField>

        <FromSubmitButton text={ t("components.form.login.button") }/>

      </View>
    </form.AppForm>
  );
}