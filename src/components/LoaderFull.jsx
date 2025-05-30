import React from "react";

const LoaderFull = () => {
  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
      <div className="loader h-10 mr-2 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
      Loading....
    </div>
  );
};

export default LoaderFull;
