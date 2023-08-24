import React from "react";

const ColorTag = ({ children, className }: { children: React.ReactNode; className: string }) => {
  return (
    <span className={`text-whiteHard leading-4 px-1 pt-px pb-0.5 rounded ${className}`}>
      {children}
    </span>
  );
};

export default ColorTag;
