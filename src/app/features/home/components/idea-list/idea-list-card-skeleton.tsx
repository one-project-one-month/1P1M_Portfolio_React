function IdeaListCardSkeleton() {
  return (
    <div className="bg-white/10 flex flex-col gap-3 p-5 backdrop-blur-xs w-full rounded-xl border border-white/5 animate-pulse">
      <div className="flex justify-between items-center gap-4">
        <div className="h-5 w-2/3 rounded bg-white/20" />
        <div className="h-5 w-20 rounded bg-white/20" />
      </div>

      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-white/15" />
        <div className="h-3 w-5/6 rounded bg-white/15" />
      </div>

      <div className="flex gap-2">
        <div className="h-5 w-16 rounded bg-white/15" />
        <div className="h-5 w-20 rounded bg-white/15" />
        <div className="h-5 w-14 rounded bg-white/15" />
      </div>

      <div className="flex justify-between border-b border-white/10 py-4">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-x-2">
            <div className="h-4 w-16 rounded bg-white/15" />
            <div className="h-6 w-6 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-4">
          <div className="h-4 w-10 rounded bg-white/15" />
          <div className="h-4 w-10 rounded bg-white/15" />
        </div>
        <div className="h-4 w-4 rounded bg-white/15" />
      </div>
    </div>
  );
}

export default IdeaListCardSkeleton;
