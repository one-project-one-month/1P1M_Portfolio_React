const ProfileIcon = ({ src }: { src: string }) => (
  <div className="flex-shrink-0 px-4">
    <div className="w-15 h-15 rounded-full border-2 border-purple-500/30 overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
      <img src={src} alt="Team Member" className="w-full h-full object-cover" />
    </div>
  </div>
);

export default ProfileIcon;
