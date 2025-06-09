"use client";

import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";

export default function LoginSocial({
  provider,
  children,
}: {
  provider: "google" | "facebook" | "linkedin";
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={async () => {
        await signIn.social({
          provider,
          callbackURL: "/dashboard",
        });
      }}
      type="button"
      variant={"outline"}
      className="w-full"
    >
      {children}
    </Button>
  );
}
