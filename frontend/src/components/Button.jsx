import React from 'react';

const Button = ({ children, href }) => {
  return (
    <a href={href} className="bg-orange-400 px-6 py-3 rounded-full hover:bg-orange-500 transition duration-300">
      {children}
    </a>
  );
};

export default Button;
