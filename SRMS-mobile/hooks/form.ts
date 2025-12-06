import { FormTextField } from "@/components/forms/FormTextField";
import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "@/contexts/form-context";



export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    FormTextField,
  },
  formComponents: {},
  fieldContext,
  formContext,
})