import { Flex } from "@chakra-ui/react";
import React from "react";
import PageTitle from "./PageTitle";
import Sidebar from "./Sidebar";

const Wrapper = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  return (
    <div className="h-full my-16 bg-white">
      <div className="h-full max-w-[1100px] m-auto my-0 px-8">
        <Flex className="justify-between">
          <div className="w-1/4">
            <Sidebar />
          </div>
          <div className="w-3/4">
            <div className="h-full ml-8">
              {title && <PageTitle title={title} />}
              {children}
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Wrapper;
