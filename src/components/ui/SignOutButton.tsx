"use client";

import { authClient } from "@/lib/auth-client";
import Button from "./Button";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const router = useRouter();

  async function handleClick() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  return <Button onClick={handleClick}>Sign Out</Button>;
}

export default SignOutButton;
