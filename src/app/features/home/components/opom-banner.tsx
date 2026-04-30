import React from 'react';

const OpomBanner = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] flex flex-col gap-10">
      
      {/* Top Banner Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BD7AFD]/80 to-transparent" />
      
      {/* Ambient Glass Lights (Blurred colored orbs behind the text) */}
      <div className="absolute -top-24 left-1/4 w-72 h-72 bg-[#BD7AFD]/15 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Top Section: What is OPOM? */}
      <div className="relative z-10 text-start">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-white tracking-tight">
          What is <span className="text-[#BD7AFD] drop-shadow-[0_0_15px_rgba(189,122,253,0.4)]">OPOM</span>?
        </h1>
        <div className="text-sm md:text-lg lg:text-xl text-white/70 space-y-4 leading-relaxed max-w-4xl">
          <p>
            One Project One Month is an organization which will have to
            develop one project within one month to a stage where a user can
            actually use it.
          </p>
          <p>
            We are dedicated to support great ideas and developing it into a
            usable project in just one month. Our process is simple: ideas
            are shared, the best are voted on, and a functioning product is
            presented in one month.
          </p>
        </div>
      </div>

      {/* Horizontal Divider between Main Intro and Sub-sections */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent shrink-0" />

      {/* Bottom Section: Who & What Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-stretch text-start">
        
        {/* Left Section: Who are we? */}
        <div className="flex-1 flex flex-col justify-center w-full">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">
            Who are <span className="text-[#BD7AFD] drop-shadow-[0_0_15px_rgba(189,122,253,0.4)]">We</span>?
          </h3>
          <p className="text-white/60 leading-relaxed text-sm md:text-base">
            We are a rapid development organization dedicated to delivering
            a fully usable project every month. We support our community and
            work intensely to present a tangible, user-ready product in 30 days.
          </p>
        </div>

        {/* The Smart Divider (Horizontal line on Mobile, Vertical line on Desktop) */}
        <div className="w-full h-[1px] md:w-[1px] md:h-auto bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0 my-2 md:my-0" />

        {/* Right Section: What to do? */}
        <div className="flex-1 flex flex-col justify-center w-full">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">
            What do you have to <span className="text-[#BD7AFD] drop-shadow-[0_0_15px_rgba(189,122,253,0.4)]">Do</span>?
          </h3>
          <p className="text-white/60 leading-relaxed text-sm md:text-base">
            You can share the ideas you have in mind. From those, the most
            popular projects will be selected and you will have to work on
            them. You will have to present the project after one month.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default OpomBanner;