const AboutUsCard = () => {
  return (
    <div className="relative group w-full max-w-[400px]">
      {/* Background Accent - Adjusted to follow the hover rotation */}
      <div className="absolute inset-0 bg-[#9a87af] rounded-lg transform transition-transform duration-300"></div>

      <div className="relative flex flex-col p-6 bg-[#54178e]/70 backdrop-blur-sm rounded-lg border border-white/10 shadow-2xl transition-transform duration-300 group-hover:rotate-3 h-full">
        <h1 className="text-2xl font-semibold text-white mb-2">Mission</h1>

        <p className="text-white/90 leading-relaxed text-justify mb-4">
          To provide a structured, fast-paced environment where designers and
          devs level up by shipping actual products, not just earning
          certificates.
        </p>

        <div className="mt-auto overflow-hidden rounded-sm">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
            alt="Team collaborating"
            className="w-full h-48 object-cover grayscale brightness-125"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsCard;
