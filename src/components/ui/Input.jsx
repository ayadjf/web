import React from 'react';

const Input = ({ className = '', ...props }) => {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
};

export default Input;
