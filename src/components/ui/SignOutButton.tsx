"use client";

import { authClient } from "@/lib/auth-client";
import Button from "./Button";
import { redirect } from "next/navigation";

function SignOutButton() {
  async function handleClick() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/login");
        },
      },
    });
  }

  return <Button onClick={handleClick}>Sign Out</Button>;
}

export default SignOutButton;
