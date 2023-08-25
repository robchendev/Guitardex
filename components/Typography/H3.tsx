import React from "react";

const H3 = ({ text, className }: { text: React.ReactNode; className?: string }) => {
  return (
    <h3 className={`mt-4 mb-2 text-xl font-medium tracking-wider ${className}`}>
      {text as string}
    </h3>
  );
};

export default H3;
