"use client";

import { createAuthClient } from "better-auth/react";
import { Spinner } from "../ui/Spinner";
import SignOutButton from "../ui/SignOutButton";
import Link from "next/link";

const { useSession } = createAuthClient();

function AuthNav() {
  const { data: session, isPending, error } = useSession();

  return (
    <nav className="flex items-center justify-end gap-4">
      {isPending ? (
        <Spinner />
      ) : error ? (
        <p className="text-sm text-red-500">{error.message}</p>
      ) : session ? (
        <SignOutButton />
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default AuthNav;
