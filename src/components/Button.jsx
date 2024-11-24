import React from "react";

const Button = ({ className, text, onClick }) => {
  return (
    <div
      className={` text-white font-semibold rounded-lg text-center bg-gradient-to-r p-2 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)] cursor-pointer flex justify-center items-center ${className} `}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
