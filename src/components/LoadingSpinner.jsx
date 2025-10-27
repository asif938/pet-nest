import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <FaSpinner className="animate-spin text-4xl text-blue-600 dark:text-blue-400" />
      <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
