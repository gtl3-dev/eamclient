"use client";
// This file is used to provide the authentication context to the application.

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-sky-600 text-white font-extrabold font- p-3 space-x-4">
      <div className="flex items-left">
        <Link href="/" className="mr-5">
          {" "}
          Home{" "}
        </Link>
        <Link href="/settings" className="mr-5">
          {" "}
          Settings{" "}
        </Link>
      </div>

      <div className="absolute right-3 flex items-center space-x-4">
        {status === "authenticated" && (
          <div>
            {" "}
            {session?.user?.name}{" "}
            <Link href="/api/auth/signout" className="ml-5">
              {" "}
              Logout{" "}
            </Link>
          </div>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin" className="mr-5">
            {" "}
            Login{" "}
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
