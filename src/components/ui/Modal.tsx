import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg bg-neutral-700 p-4 pt-12 sm:p-6 sm:pt-12 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-2 text-xl leading-none text-gray-400 hover:text-gray-200 cursor-pointer"
          aria-label="Close modal"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
