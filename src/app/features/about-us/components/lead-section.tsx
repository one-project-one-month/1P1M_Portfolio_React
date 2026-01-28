const LeadSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-24 gap-16">
      {/* Profile Image with Fade Effect */}
      <div className="relative w-full lg:w-1/2">
        <img src="./image.png" alt="Sann Lynn Htun" className="w-full h-auto" />
      </div>

      {/* Profile Content */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-white text-5xl font-bold mb-4 relative inline-block">
          The Lead
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#BD7AFD]" />
        </h2>

        <h3 className="text-white text-xl font-semibold mt-8 mb-4">
          Sann Lynn Htun :{' '}
          <span className="text-[#B4BCD0]">
            Senior Developer & Community Lead
          </span>
        </h3>

        <p className="text-[#B4BCD0] text-lg leading-relaxed mb-8">
          A seasoned Senior Developer dedicated to engineering new technologies.
          After years of navigating complex technical challenges, he founded
          OPOM to bridge the gap between theory and industry-grade professional
          standards.
        </p>

        {/* Social Icons (Simplified) */}
        <div className="flex gap-6 text-[#FFBA00] text-2xl">
          <a href="#" className="hover:text-white transition-colors">
            𝕏
          </a>
          <a href="#" className="hover:text-white transition-colors">
            f
          </a>
          <a href="#" className="hover:text-white transition-colors">
            ig
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeadSection;
