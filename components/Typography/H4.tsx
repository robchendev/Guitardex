import React from "react";

const H4 = ({ text, className }: { text: React.ReactNode; className?: string }) => {
  return (
    <h4 className={`mt-4 mb-2 text-lg font-medium tracking-wider ${className}`}>
      {text as string}
    </h4>
  );
};

export default H4;
