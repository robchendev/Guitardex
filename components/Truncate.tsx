import Link from "next/link";
import React from "react";

const Truncate = ({
  children,
  className,
  href,
  isInternal = false,
}: {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  isInternal?: boolean;
}) => {
  if (href) {
    if (isInternal) {
      return (
        <Link href={href}>
          <p className={`truncate text-gold ${className}`}>{children}</p>
        </Link>
      );
    }
    return (
      <a href={href}>
        <p className={`truncate text-gold ${className}`}>{children}</p>
      </a>
    );
  }
  return <p className={`truncate ${className}`}>{children}</p>;
};
export default Truncate;
