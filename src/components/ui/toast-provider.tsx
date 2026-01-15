import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const COLORS: Record<ToastType, string> = {
  success: '#009966',
  error: '#FF6467',
  info: '#0288d1',
  warning: '#ed6c02',
};

const Icons: Record<ToastType, React.ReactNode> = {
  success: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.66675 12.6331L10.1726 14.3541C10.596 14.838 11.3594 14.8023 11.7358 14.2811L15.3334 9.2998"
        stroke="#009966"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="#009966"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  error: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 16.3733V15.8733"
        stroke="#FF6467"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 7.62671V13.1267"
        stroke="#FF6467"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="#FF6467"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  info: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  warning: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
};

const BORDERCOLORS: Record<ToastType, string> = {
  success: '#A4F4CF',
  error: '#FFC9C9',
  info: '#0288d1',
  warning: '#ed6c02',
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

const ToastItem = ({
  toast,
  onRemove,
}: {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  return (
    <div
      style={{
        ...toastBaseStyle,
        backgroundColor: '#0F172B',
        border: `1px solid ${BORDERCOLORS[toast.type]}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '12px',
        }}
      >
        <span style={{ color: COLORS[toast.type] }}>{Icons[toast.type]}</span>
        <span style={{ flex: 1 }}>{toast.message}</span>
        <button onClick={() => onRemove(toast.id)} style={closeButtonStyle}>
          ✕
        </button>
      </div>

      {/* Progress Bar */}
      <div style={progressContainer}>
        <div
          style={{
            ...progressFill,
            backgroundColor: COLORS[toast.type],
            animation: `shrink ${toast.duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType, duration = 3000) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div style={containerStyle}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
      <style>{`@keyframes shrink { from { width: 100%; } to { width: 0%; } }`}</style>
    </ToastContext.Provider>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '24px',
  right: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  zIndex: 9999,
};

const toastBaseStyle: React.CSSProperties = {
  padding: '16px',
  borderRadius: '8px',
  color: '#fff',
  minWidth: '300px',
  position: 'relative',
  overflow: 'hidden',
};

const progressContainer: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '4px',
};

const progressFill: React.CSSProperties = {
  height: '100%',
  width: '100%',
  transformOrigin: 'left',
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  opacity: 0.6,
};

{
  /*------------------- usage of this component --------------- */
}

// add this to - /components/providers.tsx

// <QueryClientProvider client={queryClient}>
//   <ToastProvider>
//     {children}
//   </ToastProvider>
//   <ReactQueryDevtools initialIsOpen={false} />
// </QueryClientProvider>

// ---------------------------
// import this - where to use in

// import { useToast } from '@/components/ui/toast-provider';

// const {addToast} = useToast()

{
  /* <div>
  <button onClick={() => addToast("Project Created successfully", "success")}>Success Toast</button>
  <button onClick={() => addToast("Sorry! I'm breaking hearts.", "error")}>Error Toast</button>
  <button onClick={() => addToast("Something went wrong!", "info")}>Error Toast</button>
  <button onClick={() => addToast("Something went wrong!", "warning")}>Error Toast</button>
</div> */
}

{
  /*------------------- usage of this component --------------- */
}
// 1:32

//  need to add info icon and warning icon
