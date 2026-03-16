const DevCardSkeleton = () => {
  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <div className="h-full bg-white/10 rounded-lg p-5 relative flex flex-col backdrop-blur-xs border border-white/5 animate-pulse">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <div className="flex flex-col items-center shrink-0 w-20 sm:w-24">
            <div className="size-20 sm:size-24 -mt-16 rounded-xl bg-white/10" />

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

        <div className="mt-4">
          <div className="h-10 w-full bg-white/10 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default DevCardSkeleton;
