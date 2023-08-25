import React from "react";

const P = ({ text, className }: { text: React.ReactNode; className?: string }) => {
  return <p className={`text-base pb-2 last:pb-0 ${className}`}>{text as string}</p>;
};

export default P;
