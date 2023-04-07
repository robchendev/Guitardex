import React from "react";

const SubHeading = ({ label }: { label: string }) => {
  return <h2 className="md:w-8/12 text-4xl text-center mx-auto my-7">{label}</h2>;
};

export default SubHeading;
