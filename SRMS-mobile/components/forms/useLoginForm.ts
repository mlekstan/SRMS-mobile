import { apiClient } from "@/api/apiClientInstance";
import { AccessToken } from "@/api/types";
import { useAppForm } from "@/hooks/form";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { formOptions } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";


const loginFormOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
});

export function useLoginForm() {
  const { signIn } = useAuthContext();
  const { t } = useTranslationContext();
  const mutation = useMutation({
    mutationFn: (value: any) => {
      return apiClient.makeRequest<AccessToken>("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: value,
      });
    }
  });

  const form = useAppForm({
    ...loginFormOpts,
    onSubmit: async ({ value }) => {
      try {
        const { accessToken } = await mutation.mutateAsync(value);
        console.log("Access token", accessToken);
        signIn(accessToken);
        
      } catch (error) {
        if (error instanceof Error)
          console.error("Login error:", error);
      }
    },
  });

  return { form, mutation, t };
}