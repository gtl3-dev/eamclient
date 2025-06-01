"use server";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export interface Props {
  children: React.ReactNode;
}

export default async function AuthProvider({ children }: Props) {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
