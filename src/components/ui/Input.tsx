import { InputHTMLAttributes } from "react";

function Input({
  type = "",
  placeholder = "",
  name,
  required = false,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      required={required}
      type={type}
      placeholder={placeholder}
      name={name}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
      {...rest}
    />
  );
}

export default Input;
