import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`px-6 py-2 rounded-xl font-semibold shadow text-sm ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
