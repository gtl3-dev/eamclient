import React from "react";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = await cookies();
  const eamSession = cookieStore.get("session");

  // console.log(eamSession?.value);
  return <div>Cookies: </div>;
}
