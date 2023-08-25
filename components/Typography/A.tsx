import Link from "next/link";
import React from "react";

const A = ({
  text,
  href,
  className,
}: {
  text: React.ReactNode;
  href?: string;
  className?: string;
}) => {
  if (href?.startsWith("http")) {
    return (
      <a
        href={href}
        className={`text-base text-purple hover:bg-purple transition-none ${className}`}
      >
        {text as string}
      </a>
    );
  }
  return (
    <Link
      href={href as string}
      className={`text-base text-purple hover:bg-purple transition-none ${className}`}
    >
      {text as string}
    </Link>
  );
};

export default A;
