import React from "react";

const Button = ({ text, onClick, disabled, loading }) => {
  return (
    <button
      disabled={disabled}
      className="w-full disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-gray-700 bg-slate-900 text-white py-2 px-4 font-medium rounded"
      onClick={onClick}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;
