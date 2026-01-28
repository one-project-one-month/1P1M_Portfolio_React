const SocialLink = ({ Icon, href }) => (
  <a
    href={href}
    className="p-2 border-none rounded-lg hover:bg-[#FFBA00] hover:text-black transition-all duration-300 text-[#FFBA00]"
  >
    <Icon size={35} strokeWidth={1.5} />
  </a>
);

export default SocialLink;
