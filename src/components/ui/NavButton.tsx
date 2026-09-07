"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import React from "react";

// Needed to prevent "use client" in certain components.
function NavButton({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return <Button onClick={() => router.push(path)}>{children}</Button>;
}

export default NavButton;
