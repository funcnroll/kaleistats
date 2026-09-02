type Prop = {
  type: string;
  placeholder: string;
  name: string;
  required: boolean;
  hidden?: boolean;
};

function Input({
  type = "",
  placeholder = "",
  name,
  required = false,
  hidden = false,
}: Prop) {
  return (
    <input
      hidden={hidden}
      required={required}
      type={type}
      placeholder={placeholder}
      name={name}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
    />
  );
}

export default Input;
