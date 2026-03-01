function BannedStatusSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a]/40 p-6">
      <div className="max-w-lg w-full rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-xl animate-pulse">
        {/* Title */}
        <div className="h-7 w-60 bg-slate-800 rounded mb-4" />

        {/* Subtitle */}
        <div className="h-4 w-80 bg-slate-800 rounded mb-6" />

        {/* Reason box */}
        <div className="border border-slate-800 rounded-lg p-4 mb-6 space-y-3">
          <div className="h-4 w-48 bg-slate-800 rounded" />

          <div className="space-y-2">
            <div className="h-3 bg-slate-800 rounded" />
            <div className="h-3 bg-slate-800 rounded" />
            <div className="h-3 bg-slate-800 rounded w-5/6" />
            <div className="h-3 bg-slate-800 rounded w-2/3" />
          </div>
        </div>

        {/* Contact section */}
        <div className="flex gap-x-3 border-b pb-6 border-b-slate-800">
          <div className="w-6 h-6 rounded bg-slate-800" />

          <div className="flex-1 space-y-2">
            <div className="h-3 w-56 bg-slate-800 rounded" />
            <div className="h-4 w-40 bg-slate-800 rounded" />
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-6 space-y-2">
          <div className="h-3 bg-slate-800 rounded" />
          <div className="h-3 bg-slate-800 rounded w-4/5" />
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-end">
          <div className="h-9 w-20 rounded bg-slate-800" />
        </div>
      </div>
    </div>
  );
}

export default BannedStatusSkeleton;
