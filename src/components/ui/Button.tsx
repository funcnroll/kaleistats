"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        w-full rounded-md border px-5 py-2 text-sm transition-colors duration-200
        border-neutral-700 text-neutral-200
        hover:bg-neutral-800 hover:border-neutral-600
        focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-neutral-500
        disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-neutral-700
        cursor-pointer
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
