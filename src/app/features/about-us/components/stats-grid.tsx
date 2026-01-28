const StatsGrid = () => {
  // You can fetch this data from your API later
  const stats = [
    {
      label: 'SHIPPED PROJECTS',
      value: '30+',
      desc: 'Turning ambitious concepts into reality',
    },
    {
      label: 'ACTIVE BUILDERS',
      value: '100+',
      desc: 'A growing ecosystem of tech talent',
    },
    {
      label: 'WILD IDEAS MONTHLY',
      value: '50+',
      desc: 'Constant innovation and fresh thinking',
    },
    {
      label: 'GATEKEEPING',
      value: '0%',
      desc: 'Knowledge is open for everyone',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-10">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="text-[#6F28B3] text-4xl font-bold mb-2">
            {stat.value}
          </span>
          <span className="bg-[#1D293D] text-[10px] text-white/70 px-2 py-1 rounded border border-white/10 tracking-widest font-bold mb-2">
            {stat.label}
          </span>
          <p className="text-[#B4BCD0] text-xs leading-relaxed">{stat.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
