"use client";

import { tw_green_button } from "@/lib/tw-constants";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";

export default function LoginIntuit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={async () => {
        await signIn.oauth2({
          providerId: "intuit-id",
          callbackURL: "/dashboard",
        });
      }}
      type="button"
      variant={"outline"}
      className={tw_green_button}
    >
      {children}
    </Button>
  );
}
