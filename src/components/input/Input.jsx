import React from "react";

const Input = ({ label, placeholder, type, value, setValue }) => {
  return (
    <label className="w-full flex flex-col gap-2">
      <span className="font-medium">{label}</span>
      <input 
      className="w-full p-1 text-lg rounded"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
};

export default Input;
