const statusColorMap: Record<string, string> = {
  Complete: 'bg-[#00A63E]',
  'In Progress': 'bg-[#FF8904]',
  Planning: 'bg-[#155DFC]',
  Unqualified: 'bg-[#79716B]',
};

const StatusTag = ({ status }: { status: string }) => {
  return (
    <div
      className={`text-sm text-white opacity-100 gap-1.5 rounded-lg py-1 px-3 ${statusColorMap[status]}`}
    >
      {status}
    </div>
  );
};

export default StatusTag;
