import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 flex items-center justify-center">
      <div className="fixed bg-black/50" onClick={onClose} />

      <div className="bg-neutral-500 rounded-lg px-6 max-w-md mx-4 shadow-xl">
        {children}
      </div>
    </div>
  );
}

export default Modal;
