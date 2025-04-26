"use client";
// This file is used to provide the authentication context to the application.

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-linear-65 from-purple-700 to-sky-500 text-white font-extrabold font- p-3 space-x-4">
      <div className="flex items-left">
        <Link href="/" className="mr-5">
          {" "}
          Home{" "}
        </Link>
      </div>

      <div className="absolute right-3 flex items-center space-x-4">
        {status === "authenticated" && (
          <div>
            <Link href="/settings" className="mr-5">
              {" "}
              [ UserSettings ]{" "}
            </Link>
            {"     "}
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
