import React from 'react';

export default function GeneralLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-50">
      <div className="flex space-x-2">
        <div className="w-5 h-5 bg-blue-800 rounded-sm animate-bounce"></div>
        <div className="w-5 h-5 bg-blue-800 rounded-sm animate-bounce delay-150"></div>
        <div className="w-5 h-5 bg-blue-800 rounded-sm animate-bounce delay-300"></div>
      </div>
    </div>
  );
}
