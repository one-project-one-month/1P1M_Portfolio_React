const AboutUsCard = () => {
  return (
    <div className="relative group">
      {/* Background Layer: Tilts Left (Counter-clockwise) */}
      <div className="absolute inset-0 bg-purple-200/70 rounded-lg transform transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"></div>

      {/* Main Card: Tilts Right (Clockwise) */}
      <div className="relative flex flex-col p-4 bg-[#6F28B3] rounded-lg w-[400px] border border-white/10 shadow-2xl transition-transform duration-300 group-hover:rotate-2">
        <h1 className="text-xl font-bold text-white">Mission</h1>

        <p className="text-white/70 leading-relaxed text-justify">
          To provide a structured, fast-paced environment where designers and
          devs level up by shipping actual products, not just earning
          certificates.
        </p>

        <div className="mt-2 overflow-hidden rounded-sm">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
            alt="Team collaborating"
            className="w-full h-auto object-cover grayscale brightness-125"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsCard;
