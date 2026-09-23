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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg bg-neutral-900 border border-neutral-700 p-4 pt-12 sm:p-6 sm:pt-12 shadow-2xl text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 px-2.5 py-1 rounded-md text-sm font-semibold text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 cursor-pointer transition-colors"
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
