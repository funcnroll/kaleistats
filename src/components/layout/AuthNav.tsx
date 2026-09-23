"use client";

import { Spinner } from "../ui/Spinner";
import SignOutButton from "../ui/SignOutButton";

import { useSession } from "@/lib/auth-client";
import NavButton from "../ui/NavButton";

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
          <NavButton path="/dashboard">Dashboard</NavButton>
          <SignOutButton />
        </>
      ) : (
        <>
          <NavButton path="/login">Login</NavButton>
          <NavButton path="/register">Register</NavButton>
        </>
      )}
    </nav>
  );
}

export default AuthNav;
