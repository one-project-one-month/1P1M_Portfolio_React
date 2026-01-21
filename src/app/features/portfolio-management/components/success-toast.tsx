import { CheckCircle, X } from 'lucide-react';

interface SuccessToastProps {
  message: string;
  onClose?: () => void;
}

export function SuccessToast({ message, onClose }: SuccessToastProps) {
  return (
    <div className="fixed top-20 right-8 w-96 h-14 rounded-lg border border-[#A4F4CF] bg-slate-900 shadow-lg flex items-center px-4 gap-2 z-50">
      <CheckCircle className="w-6 h-6 text-[#009966] shrink-0" />
      <span className="text-sm font-medium text-[#009966] flex-1">
        {message}
      </span>
      <button onClick={onClose} className="shrink-0">
        <X className="w-6 h-6 text-[#6A7282]" />
      </button>
      <div className="absolute bottom-0 left-0 h-0.5 w-36 bg-[#009966]" />
    </div>
  );
}
