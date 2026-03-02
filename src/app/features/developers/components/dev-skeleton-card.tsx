const DevCardSkeleton = () => {
  return (
    <div className="w-full mt-12">
      <div className="h-full bg-white/10 rounded-lg p-6 relative flex flex-col backdrop-blur-xs border border-white/5 animate-pulse">
        <div className="flex gap-6">
          <div className="flex flex-col items-center shrink-0 w-[120px]">
            <div className="size-[120px] -mt-16 rounded-xl bg-white/10" />

            <div className="flex gap-3 mt-6">
              <div className="size-5 rounded bg-white/10" />
              <div className="size-5 rounded bg-white/10" />
            </div>
          </div>

          <div className="flex flex-col pt-1 w-full">
            <div className="h-6 w-3/4 bg-white/10 rounded mb-3" />

            <div className="h-6 w-24 bg-white/10 rounded mb-3" />

            <div className="h-4 w-full bg-white/10 rounded mb-2" />
            <div className="h-4 w-2/3 bg-white/10 rounded" />
          </div>
        </div>

        <div className="mt-6">
          <div className="h-11 w-full bg-white/10 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default DevCardSkeleton;
