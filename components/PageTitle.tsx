import React from "react";

const PageTitle = ({ title }: { title: string }) => {
  return <h1 className="mt-0 text-3xl font-medium text-center mx-auto hidden lg:block">{title}</h1>;
};

export const PageTitleMobile = ({ title }: { title: string }) => {
  return (
    <h1 className="font-medium font-serif font-weight:900 text-3xl text-center mx-auto block lg:hidden">
      {title}
    </h1>
  );
};

export default PageTitle;
