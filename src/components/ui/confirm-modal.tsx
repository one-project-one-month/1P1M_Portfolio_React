import React, { useEffect, useState } from 'react';

interface ConfirmationModalProps {
  id: number;
  isOpen: boolean;
  title: string;
  subtitle?: string;
  rejectText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  subtitle,
  rejectText,
  confirmText,
  onCancel,
  onConfirm,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  if (!isOpen && !shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-out 
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Overlay background */}
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />

      {/* Modal box */}
      <div
        className={`relative w-[410px] bg-[#000000] border-2 border-[#364153] text-[#99A1AF] text-center rounded-3xl p-6 max-w-md shadow-2xl transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'}
            `}
      >
        <h2 className="text-xl font-semibold text-white">{title}</h2>

        {subtitle && <p className="mt-5">{subtitle}</p>}

        <div className="flex justify-center gap-3 mt-10">
          <button
            type="button"
            onClick={onCancel}
            className="border border-[#6A7282] hover:border-white/70 hover:text-white rounded-md transition-colors px-4 py-2"
          >
            {rejectText || 'Cancel'}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="bg-[#C10007] text-white rounded hover:bg-red-700 transition-colors px-4 py-2 font-medium"
          >
            {confirmText || 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

// ----- usage of this component ----- //

/* 
    // import this 
    import { useState } from 'react';
    import ConfirmationModal from '@/components/ui/confirm-model';

    // add this 
  const [open, setOpen] = useState(false);

    <div>
      <button onClick={() => setOpen(true)}>
        Delete Item
      </button>

      <ConfirmationModal
        isOpen={open}
        title="Are you sure to delete?"
        subtitle="The project portfolio will be deleted. Are you really want to delete it?"
        rejectText="No Bro" // optional - default is : Cancel
        confirmText="Confirm" // optional - default is : Delete
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          console.log("Deleted");
          setOpen(false);
        }}
      />
    </div>        
*/
