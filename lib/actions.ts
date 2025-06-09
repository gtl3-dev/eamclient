"use server";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const rawFormdata = {
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }

  const {email, firstName, lastName, password } = rawFormdata;

  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email: `${email}`,
        password: `${password}`,
      }
    })
  } catch(e) {
    console.log(e)
  }

  redirect("/dashboard")

}