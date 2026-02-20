const statusColorMap: Record<string, Record<string, string>> = {
  COMPLETED: { color: 'bg-[#00A63E]', name: 'Complete' },
  IN_PROGRESS: { color: 'bg-[#FF8904]', name: 'In Progress' },
  PENDING: { color: 'bg-[#155DFC]', name: 'Planning' },
  UNQUALIFIED: { color: 'bg-[#79716B]', name: 'Unqualified' },
};

const StatusTag = ({ status }: { status: string }) => {
  return (
    <div
      className={`text-sm text-white opacity-100 gap-1.5 rounded-lg py-1 px-3 ${statusColorMap[status].color}`}
    >
      {statusColorMap[status].name}
    </div>
  );
};

export default StatusTag;
