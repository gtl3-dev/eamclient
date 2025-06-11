"use client";

import React, { useState } from "react";
import { signOut } from "@/lib/auth-client";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import { useRouter } from "next/navigation";
import { delCookie } from "@/lib/getTokens";

const page = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  async function handleClose() {
    console.log("CLOSE");
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          delCookie("accessToken");
          console.log("CLOSE onSuccess");
          setOpen(false);
          router.refresh();
        },
      },
    });
  }

  return (
    <div>
      <ConfirmDialog
        title="Logout?"
        body="This will log you out of the session"
        isopen={open}
        callbackfunction={handleClose}
      />
    </div>
  );
};

export default page;
