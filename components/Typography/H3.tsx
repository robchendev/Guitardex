import React from "react";

const H3 = ({ text }: { text: React.ReactNode }) => {
  return <h3 className="mt-4 mb-2 text-xl font-semibold tracking-wider">{text as string}</h3>;
};

export default H3;
