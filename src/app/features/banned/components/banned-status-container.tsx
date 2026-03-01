import Envelop from '@/assets/icons/Envelop';
import XTriangle from '@/assets/icons/XTriangle';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useBanStatusQuery } from '../hooks/banned.query';
import BannedStatusSkeleton from './banned-status-skeleton';

type BannedStatusContainerProps = {
  userId: string;
};

function BannedStatusContainer({ userId }: BannedStatusContainerProps) {
  if (isNaN(Number(userId))) {
    return <Navigate to="/not-found" replace />;
  }

  const { data, isLoading } = useBanStatusQuery(userId);
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return <BannedStatusSkeleton />;
  }

  const banData = data?.data;
  const reason = banData?.bannedReason ?? 'No reason provided.';

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a]/40 p-6">
      <div className="max-w-lg w-full rounded-2xl border border-red-600 bg-slate-950 p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-red-500 mb-3">
          <XTriangle className="inline-block mr-2 text-red-500" />
          Account Suspended
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          Your access has been restricted by an administrator.
        </p>

        <div className="bg-red-900/40 border border-red-700 rounded-lg p-4 mb-6">
          <h2 className="text-red-500 mb-2">REASON FOR SUSPENSION</h2>

          <p
            className={`text-gray-200 text-sm transition-all duration-300 ${
              expanded
                ? 'max-h-40 overflow-y-auto pr-2'
                : 'max-h-20 overflow-hidden'
            }`}
          >
            {expanded ? reason : reason.slice(0, 200)}
          </p>

          {reason.length > 200 && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-3 text-sm text-red-400 hover:text-red-300 transition"
            >
              {expanded ? 'See less' : 'See more'}
            </button>
          )}
        </div>

        <div className="text-sm flex gap-x-2 border-b pb-6 border-b-gray-400 text-gray-400">
          <Envelop className="text-primary-custom" />

          <div>
            <p className="mb-1">Think this is a mistake? Contact admin:</p>
            <a
              href="mailto:oneprojectonemonth@gmail.com"
              className="text-purple-400 hover:underline font-medium"
            >
              oneprojectonemonth@gmail.com
            </a>
          </div>
        </div>

        <p className="mt-6 text-gray-400 text-xs opacity-70">
          Include your username and a brief explanation in your appeal email.
          Response times may vary.
        </p>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => (window.location.href = '/')}
            className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BannedStatusContainer;
