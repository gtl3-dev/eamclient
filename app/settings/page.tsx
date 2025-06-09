import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { readcompanyinfo_api } from "../../lib/qbapis";

// This is the settings page for the application
export default async function SettingsPage() {
  // Get the cookies from the request
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const accessToken = (await cookies()).get("accessToken")?.value;
  // const accessToken =   "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwieC5vcmciOiJIMCJ9..rGywtZUaMuDBULwtXEqGwQ.V2AnNkF2HQPhUWG3K6exYkkmHGwhe455hc51p2N6fVdOVJRpE-ZPbV1_KIEg5mM6o-hKZ5U2fhu3eGoo9GVbmlqVW5ThG_Ya62K5ssXrushgieZCDYvivBW-Z2D06p_v_F7A66tVE3yfMSNR_shvrONkj9OmSvGMsrrz2cyLEFf9RfoKsLtuA5zZnjRETTsJ9RJH3p92CFVYW5Pdsi0J5MZ4cn6wwzV-wd6_EK-HjBCocqfHPZQu_TM9s9jh-xiLpdSVOQdFsWsrfMlVSZjhrMCTRz-W9nPb-GOh6t2k7qq-6mYW3Sevn0TuR9I9zIs5len59vrFZ0LAqMuFYpcQIDMZQKW9q41RmrbpDgtBK7lfR5H9xqU0WjbFBAJGXCPSaKUJWOKVQeGOOD0lBULwH9g8RKAryzxRR2B2fx26Gz-IrpYQY7VSFAupS6QrGE_5idEQxpOu5rjJUQBYdoXD2YRsetcUub4VHVWcBq2plb4.YWFdLxJonximT6WsfAwAGw";
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  const expiresIn = (await cookies()).get("expiresIn")?.value;
  console.log("accessToken--------------: ", accessToken);

  const data = await fetch(
    // "https://sandbox-quickbooks.api.intuit.com/v3/company/9341454422054263/account/84?minorversion=75",
    `${readcompanyinfo_api}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "User-Agent": "PythonSampleApp1",
      },
    }
  )
    .then((res) => {
      console.log("res in /app/settings/page.tsx: ", res);
      return res;
    })
    .catch((err) => {
      console.log("Error: ", err);
    });

  return (
    <div>
      Settings Page
      <br />
      {session?.user.name}
      {data?.status}
      <br />
      {/* {settings} */}
    </div>
  );
}
