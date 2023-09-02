import Link from "next/link";
import React from "react";

const A = ({
  text,
  href,
  className,
  spanned = false,
}: {
  text: React.ReactNode;
  href?: string;
  className?: string;
  spanned?: boolean;
}) => {
  if (href?.startsWith("http")) {
    return (
      <a
        href={href}
        className={`text-base text-link hover:bg-link hover:text-bg2 transition-none ${
          spanned && "inline"
        } ${className}`}
      >
        {text as string}
      </a>
    );
  }
  return (
    <Link
      href={href as string}
      className={`text-base text-link hover:bg-link hover:text-bg2 transition-none ${
        spanned && "inline"
      } ${className}`}
    >
      {text as string}
    </Link>
  );
};

export default A;
