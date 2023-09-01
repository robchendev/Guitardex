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
    // Render as <div> instead of <p> since we sometimes convert <img> to other components,
    // those components include <div> which cannot be a child of <p>
    // The differences shouldn't matter much since this repo uses a CSS reset.
    <div className={`text-base pb-2 last:pb-0 ${spanned && "inline"} ${className}`}>
      {text as string}
    </div>
  );
};

export default P;
