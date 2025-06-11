import  { useState, useRef } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const [translateY, setTranslateY] = useState(0);
  const modalRef = useRef(null);
  let startY = 0;

  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY;
    const diff = touchY - startY;

    if (diff > 0) {
      setTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (translateY > 100) {
      onClose();
    }
    setTranslateY(0);
  };

  if (!isOpen) return null;

  return (
    <div 
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-[9999]">
      <div
        ref={modalRef}
        style={{
          transform: `translateY(${translateY}px)`,
          transition: "transform 0.2s ease-out",
        }}
        className="bg-white w-full max-w-2xl h-full rounded-xl overflow-hidden relative shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-400 rounded-full"></div>

        <div className="p-4 md:p-6 h-full overflow-y-auto">
          {children}
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
