import Link from "next/link";
import React from "react";

const A = ({ text, href }: { text: React.ReactNode; href?: string }) => {
  if (href?.startsWith("http")) {
    return (
      <a href={href} className="text-base text-purple hover:bg-purple transition-none">
        {text as string}
      </a>
    );
  }
  return (
    <Link href={href as string} className="text-base text-purple hover:bg-purple transition-none">
      {text as string}
    </Link>
  );
};

export default A;
