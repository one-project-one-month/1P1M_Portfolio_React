import ProfileIcon from './profile-icon';

const TeamBar = ({
  align = 'left',
  team,
}: {
  align?: 'left' | 'right';
  team?: string;
}) => {
  const isRight = align === 'right';
  const teamMembers = [
    { id: 1, img: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, img: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, img: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, img: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, img: 'https://i.pravatar.cc/150?u=5' },
    { id: 6, img: 'https://i.pravatar.cc/150?u=6' },
  ];

  const doubleMembers = [...teamMembers, ...teamMembers];

  return (
    <div
      className={`flex flex-col ${isRight ? 'items-end' : 'items-start'} justify-center mt-8 w-full px-[16.6%]`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="h-[2px] w-8 bg-[#6F28B3]"></div>
        <span className="text-white font-medium text-sm tracking-widest">
          {team}
        </span>
      </div>

      <div className="relative w-full overflow-hidden border border-[#6F28B3] rounded-3xl py-2 px-4 bg-purple-950/10">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a021a] to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a021a] to-transparent z-10"></div>

        <div className="animate-marquee flex">
          {doubleMembers.map((member, index) => (
            <ProfileIcon key={`${member.id}-${index}`} src={member.img} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamBar;
