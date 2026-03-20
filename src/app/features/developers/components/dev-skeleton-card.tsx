const DevCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col animate-pulse rounded-3xl border border-white/5 bg-[#1a1a2e]/70 backdrop-blur-[0.5px] p-7">
      {/* Avatar row */}
      <div className="mb-5 flex items-center gap-4">
        <div className="size-14 shrink-0 rounded-full bg-white/[0.08]" />
        <div className="min-w-0 flex-1">
          <div className="mb-2 h-5 w-3/4 rounded-md bg-white/[0.08]" />
          <div className="h-3 w-1/3 rounded-md bg-white/[0.06]" />
        </div>
        <div className="flex gap-1.5">
          <div className="size-9 rounded-lg bg-white/[0.04]" />
          <div className="size-9 rounded-lg bg-white/[0.04]" />
        </div>
      </div>

      {/* Tech pills */}
      <div className="mb-4 flex gap-1.5">
        <div className="h-7 w-16 rounded-lg bg-white/[0.06]" />
        <div className="h-7 w-20 rounded-lg bg-white/[0.06]" />
      </div>

      {/* Bio */}
      <div className="mb-5 flex-1 space-y-2">
        <div className="h-3.5 w-full rounded-md bg-white/[0.06]" />
        <div className="h-3.5 w-2/3 rounded-md bg-white/[0.06]" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/[0.04] pt-5">
        <div className="flex items-center gap-3">
          <div className="h-4 w-24 rounded-md bg-white/[0.06]" />
          <div className="size-9 rounded-full bg-white/[0.04]" />
        </div>
        <div className="flex gap-3">
          <div className="h-3 w-12 rounded-md bg-white/[0.04]" />
          <div className="h-3 w-16 rounded-md bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
};

export default DevCardSkeleton;
