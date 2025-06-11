import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { readcompanyinfo_api } from "../../lib/qbapis";
import LoginIntuit from "@/components/login-intuit";

// This is the settings page for the application
export default async function SettingsPage() {
  // Get the cookies from the request
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const accessToken = (await cookies()).get("accessToken")?.value;
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  const expiresIn = (await cookies()).get("expiresIn")?.value;
  const data = await fetch(
    // "https://sandbox-quickbooks.api.intuit.com/v3/company/9341454422054263/account/84?minorversion=75",
    `${readcompanyinfo_api}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    }
  );

  console.log("accessToken--------------: ", accessToken);
  console.log("session in settings/page: ", session);
  console.log("DATA in settings/page: ", data);

  return (
    <div>
      Session Settings:
      <br />
      User Name: {session?.user.name}
      <br />
      User ID: {session?.user.id}
      <br />
      {data?.status !== 200 ? (
        <LoginIntuit> Connect to Intuit</LoginIntuit>
      ) : (
        <p>Connected to Intuit</p>
      )}
    </div>
  );
}
