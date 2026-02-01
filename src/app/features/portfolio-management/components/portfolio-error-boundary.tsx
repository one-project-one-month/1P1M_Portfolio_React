import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useRouteError } from 'react-router-dom';

const PortfolioErrorBoundary = () => {
  const error: any = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="mb-6 p-4 bg-red-500/10 rounded-full">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">
        Something went wrong
      </h2>

      <p className="text-white/60 max-w-md mb-8">
        We encountered an error while loading the portfolio data.
        {error?.message && (
          <span className="block mt-2 p-2 bg-black/20 rounded text-sm font-mono text-red-400">
            {error.message}
          </span>
        )}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-2 bg-[#9C39FC] hover:bg-[#9333ea] text-white rounded-lg transition-colors font-medium"
        >
          <RefreshCw size={18} />
          Try Again
        </button>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-white/10 hover:bg-white/5 text-white rounded-lg transition-colors font-medium"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PortfolioErrorBoundary;
