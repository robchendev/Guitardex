import React from "react";

const H4 = ({ text }: { text: React.ReactNode }) => {
  return <h4 className="mt-4 mb-2 text-lg font-semibold tracking-wider">{text as string}</h4>;
};

export default H4;
