"use client";

import { Spinner } from "../ui/Spinner";
import SignOutButton from "../ui/SignOutButton";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

function AuthNav() {
  const { data: session, isPending, error } = useSession();

  return (
    <nav className="flex items-center justify-end gap-4">
      {isPending ? (
        <Spinner />
      ) : error ? (
        <p className="text-sm text-red-500">{error.message}</p>
      ) : session ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <SignOutButton />
        </>
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
