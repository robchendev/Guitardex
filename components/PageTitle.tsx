import React from "react";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="font-serif font-weight:900 text-4xl text-center mx-auto my-7 hidden lg:block">
      {title}
    </h1>
  );
};

export const PageTitleMobile = ({ title }: { title: string }) => {
  return (
    <h1 className="font-serif font-weight:900 text-3xl text-center mx-auto block lg:hidden">
      {title}
    </h1>
  );
};

export default PageTitle;
