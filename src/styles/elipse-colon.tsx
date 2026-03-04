export const EllipseColon = () => (
  <div className="relative flex items-center justify-center p-1.5 sm:p-2.5 lg:p-5 px-0 lg:px-5">
    <span
      className="text-2xl sm:text-3xl lg:text-6xl font-semibold invisible select-none"
      aria-hidden="true"
    >
      0
    </span>
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 lg:gap-3">
      <span className="w-1.25 h-1.25 lg:w-2.5 lg:h-[9.7207px] rounded-full bg-white" />
      <span className="w-1.25 h-1.25 lg:w-2.5 lg:h-[9.7207px] rounded-full bg-white" />
    </div>
  </div>
);
