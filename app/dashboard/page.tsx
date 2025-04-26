import React from "react";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return <div>Dashboard Page</div>;
}
// This page is protected by the middleware.ts file. If the user is not authenticated, they will be redirected to the login page.
