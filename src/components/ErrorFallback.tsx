import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetErrorBoundary 
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-red-50 rounded-lg">
      <div className="max-w-md w-full p-6">
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-red-700 text-center mb-2">
          Something went wrong
        </h2>
        <div className="bg-white p-4 rounded-md shadow-sm mb-4">
          <p className="text-sm text-gray-600 font-mono break-all">
            {error.message}
          </p>
        </div>
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 
                   transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
};