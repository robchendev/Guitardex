import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { Icon } from "@chakra-ui/react";

const Button = ({
  url,
  path,
  icon,
  isExternal = false,
  children,
}: {
  url: string;
  path: string;
  icon: IconType;
  isExternal?: boolean;
  children: React.ReactNode;
}) => {
  const isActive = path === url;
  if (isExternal) {
    return (
      <a
        href={url}
        className={`pb-1 hover:cursor-pointer w-full px-3 py-2 rounded-md border${
          isActive
            ? " border-purple  hover:border-purple bg-purple text-white"
            : " border-bg-light  hover:border-grey-light hover:text-text-light transition-none"
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
      className={`pb-1 hover:cursor-pointer w-full px-3 py-2 rounded-md border${
        isActive
          ? " border-purple  hover:border-purple bg-purple text-white"
          : " border-bg-light  hover:border-grey-light hover:text-text-light transition-none"
      }`}
    >
      <Icon as={icon} className="text-2xl mb-[4px] mr-2" />
      {children}
    </Link>
  );
};

export default Button;
