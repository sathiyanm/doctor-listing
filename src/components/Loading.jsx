import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
}

export default Loading;
