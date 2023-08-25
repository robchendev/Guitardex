import React from "react";

const P = ({ text }: { text: React.ReactNode }) => {
  return <p className="text-base pb-2 last:pb-0">{text as string}</p>;
};

export default P;
