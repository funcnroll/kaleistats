type Prop = {
  type: string;
  placeholder: string;
};

function Input({ type = "", placeholder = "" }: Prop) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
    />
  );
}

export default Input;
