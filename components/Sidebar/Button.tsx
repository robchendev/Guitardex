import React from "react";

const Button = ({
  isActive = false,
  children,
}: {
  isActive?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`hover:cursor-pointer w-full px-4 py-2 rounded-md border${
        isActive
          ? " border-purple-light  hover:border-purple-light bg-purple-light text-white"
          : " border-slate-light  hover:border-grey2-light"
      }`}
    >
      ?? {children}
    </div>
  );
};

export default Button;
