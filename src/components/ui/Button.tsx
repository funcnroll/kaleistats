"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  variant = "primary",
  className = "",
  children,
}: ButtonProps) {
  const base = "rounded-md px-5 py-2 text-sm transition-colors cursor-pointer";
  const variants = {
    primary: "border border-neutral-700 text-neutral-200 hover:bg-neutral-900",
    secondary: "text-neutral-400 hover:text-neutral-200",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
