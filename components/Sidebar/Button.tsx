import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { Icon } from "@chakra-ui/react";

const Button = ({
  url,
  path,
  icon,
  onClick,
  isExternal = false,
  children,
}: {
  url: string;
  path: string;
  icon: IconType;
  onClick?: () => void;
  isExternal?: boolean;
  children: React.ReactNode;
}) => {
  const isActive = path === url;
  if (onClick) {
    return (
      <div
        onClick={onClick}
        className="pb-1 hover:cursor-pointer w-full px-3 py-2 rounded-md border border-bg  hover:border-grey hover:text-text transition-none"
      >
        <Icon as={icon} className="text-2xl mb-[4px] mr-2" />
        {children}
      </div>
    );
  }
  if (isExternal) {
    return (
      <a
        href={url}
        className={`pb-1 hover:cursor-pointer w-full px-3 py-2 rounded-md border${
          isActive
            ? " border-purple  hover:border-purple bg-purple text-white"
            : " border-bg  hover:border-grey hover:text-text transition-none"
        }`}
      >
        <Icon as={icon} className="text-2xl mb-[4px] mr-2" />
        {children}
      </a>
    );
  }
  return (
    <Link
      href={url}
      onClick={(e) => {
        // Prevent sidebar clicks from passing through on mobile
        e.stopPropagation();
      }}
      className={`pb-1 hover:cursor-pointer w-full px-3 py-2 rounded-md border${
        isActive
          ? " border-purple  hover:border-purple bg-purple text-white"
          : " border-bg  hover:border-grey hover:text-text transition-none"
      }`}
    >
      <Icon as={icon} className="text-2xl mb-[4px] mr-2" />
      {children}
    </Link>
  );
};

export default Button;
