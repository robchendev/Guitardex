import React from "react";

const Wrapper = ({
  children,
  hasFooter = true,
}: {
  children: React.ReactNode;
  hasFooter?: boolean;
}) => {
  return (
    <div>
      <header className="p-4 mx-auto md:w-8/12 fixed md:relative md:flex md:justify-between md:items-center md:text-center">
        Logo
        {/* <NavigationBar /> */}
      </header>
      <main>{children}</main>
      {hasFooter && (
        <footer className="container flex items-center justify-center mx-auto h-32 text-center">
          Footer
        </footer>
      )}
    </div>
  );
};

export default Wrapper;
