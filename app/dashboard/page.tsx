import React from "react";

export default async function DashboardPage() {
  return <div>Dashboard Page</div>;
}
// This page is protected by the middleware.ts file. If the user is not authenticated, they will be redirected to the login page.
