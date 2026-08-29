interface ErrMsgProps {
  children: React.ReactNode;
  className?: string;
}

export default function ErrMsg({ children, className = "" }: ErrMsgProps) {
  return (
    <div
      className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md m-8 ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
}
