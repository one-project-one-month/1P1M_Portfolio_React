const Action = ({
  label,
  onClick,
  danger,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-2 text-left text-sm rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 ${
      danger ? 'text-rose-400' : 'text-slate-200'
    }`}
  >
    {label}
  </button>
);

export default Action;
