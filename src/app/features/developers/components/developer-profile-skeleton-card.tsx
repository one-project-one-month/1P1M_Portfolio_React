function DeveloperProfileCardSkeleton() {
  return (
    <div className="w-full flex gap-x-6 items-center p-5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/5 animate-pulse">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-2 items-center shrink-0">
        {/* Avatar */}
        <div className="w-40 aspect-square rounded-xl bg-white/10" />

        {/* Social icons */}
        <div className="flex gap-3">
          <div className="w-7 h-7 rounded-full bg-white/10" />
          <div className="w-7 h-7 rounded-full bg-white/10" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-y-3 max-w-80 w-full">
        {/* Name */}
        <div className="h-5 w-2/3 rounded bg-white/10" />

        {/* Role */}
        <div className="h-4 w-24 rounded bg-white/10" />

        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="h-4 w-48 rounded bg-white/10" />
          <div className="w-4 h-4 rounded bg-white/10" />
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <div className="h-4 w-40 rounded bg-white/10" />
          <div className="w-4 h-4 rounded bg-white/10" />
        </div>

        {/* Telegram */}
        <div className="h-4 w-32 rounded bg-white/10 opacity-60" />

        {/* About */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-5/6 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default DeveloperProfileCardSkeleton;
