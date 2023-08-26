import React from "react";

const P = ({
  text,
  className,
  spanned = false,
}: {
  text: React.ReactNode;
  className?: string;
  spanned?: boolean;
}) => {
  return (
    <p className={`text-base pb-2 last:pb-0 ${spanned && "inline"} ${className}`}>
      {text as string}
    </p>
  );
};

export default P;
