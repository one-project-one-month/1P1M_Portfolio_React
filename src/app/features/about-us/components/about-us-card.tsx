interface AboutUsCardProps {
  title: string;
  description: string;
  image: string;
  accentColor?: string;
  bgColor?: string;
  rotateOnHover?: boolean;
}

const AboutUsCard = ({
  title,
  description,
  image,
  accentColor = '#9a87af',
  bgColor = 'bg-[#54178e]/70',
  rotateOnHover = true,
}: AboutUsCardProps) => {
  return (
    <div className="relative group w-full max-w-100">
      {/* Background Accent */}
      <div
        className="absolute inset-0 rounded-lg transition-transform duration-300"
        style={{ backgroundColor: accentColor }}
      ></div>

      <div
        className={`relative flex flex-col p-6 ${bgColor} backdrop-blur-sm rounded-lg border border-white/10 shadow-2xl transition-transform duration-300 ${
          rotateOnHover ? 'group-hover:rotate-3' : ''
        } h-full`}
      >
        <h1 className="text-2xl font-semibold text-white mb-2">{title}</h1>

        <p className="text-white/90 h-28 leading-relaxed text-justify mb-4">
          {description}
        </p>

        <div className="mt-auto overflow-hidden rounded-sm">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        </div>
      </div>
    </div>
  );
};

export default AboutUsCard;
