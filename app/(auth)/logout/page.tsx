"use client";

import React, { useState } from "react";
import { signOut } from "@/lib/auth-client";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import { redirect } from "next/navigation";
import router from "next/router";

const page = () => {
  const [open, setOpen] = useState(true);

  async function handleClose() {
    console.log("CLOSE");
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          console.log("CLOSE onSucess");
          router.push("/"); // redirect to login page
        },
      },
    });
    setOpen(false);
    redirect("/");
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
