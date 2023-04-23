import Link from "next/link";
import React from "react";

const Truncate = ({
  children,
  className,
  href,
  isInternal = false,
  newTab = false,
}: {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  isInternal?: boolean;
  newTab?: boolean;
}) => {
  if (href) {
    if (isInternal) {
      return (
        <Link href={href} target={newTab ? "_blank" : "_self"}>
          <p className={`truncate text-gold ${className}`}>{children}</p>
        </Link>
      );
    }
    return (
      <a href={href} target="_blank">
        <p className={`truncate text-gold ${className}`}>{children}</p>
      </a>
    );
  }
  return <p className={`truncate ${className}`}>{children}</p>;
};
export default Truncate;
