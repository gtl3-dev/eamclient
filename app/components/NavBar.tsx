import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function NavBar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("Navbar SESSION: ", session);

  return (
    <div className="flex bg-linear-65 from-purple-700 to-sky-500 text-white font-extrabold p-3 space-x-4">
      <div className="flex items-left">
        <Link href="/" className="mr-5">
          {" "}
          Home{" "}
        </Link>
      </div>

      <div className="absolute right-3 flex items-center space-x-4">
        {session && (
          <div>
            <Link href="/settings" className="mr-5">
              {" "}
              [ UserSettings ]{" "}
            </Link>
            {"     "}
            {session?.user?.name}{" "}
            <Link href="/logout" className="ml-5">
              {" "}
              Logout{" "}
            </Link>
          </div>
        )}
        {!session && (
          <Link href="/login" className="mr-5">
            {" "}
            Login{" "}
          </Link>
        )}
      </div>
    </div>
  );
}
