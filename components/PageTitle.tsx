import React from "react";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="font-serif md:w-8/12 font-weight:900 text-4xl text-center mx-auto my-7">
      {title}
    </h1>
  );
};

export default PageTitle;
