import React, { Suspense, lazy } from "react";
import PageTitle, { PageTitleMobile } from "./PageTitle";
import Sidebar from "./Sidebar";
import { FiAlignJustify } from "react-icons/fi";
import { Icon, useDisclosure, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const WrapperDrawer = dynamic(() => import("./WrapperDrawer"), {
  loading: () => <p>Loading...</p>,
});

const Wrapper = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <div className="h-full bg-bg2 lg:py-16 lg:pb-16 lg:hp-24 font-fredoka font-normal tracking-[0.4px]">
      {/* <div className="flex justify-end w-full h-16 lg:!hidden lg:h-0 lg:w-0 fixed top-0"> */}
      <div className="w-[10px] h-[10px] m-4" />
      <PageTitleMobile title={title ?? "GuitarDex"} />
      <button ref={btnRef} className="w-10 h-10 m-4 " onClick={onOpen}>
        <Icon w={10} h={10} as={FiAlignJustify} />
      </button>
      {/* <PageTitle title={title ?? "Guitardex"}></PageTitle> */}
      {/* </div> */}

      <WrapperDrawer isOpen={isOpen} btnRef={btnRef} onClose={onClose} />

      <div className="h-full max-w-[1100px] m-auto my-0 px-8">
        <Flex className="justify-between">
          <div className="hidden lg:block lg:w-1/4 ">
            <Sidebar />
          </div>
          <div className="w-full lg:w-3/4">
            <div className="h-full lg:ml-8 ">
              <div className="hidden lg:block ">
                {title && <PageTitle title={title ?? "Guitardex"} />}
              </div>
              {children}
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Wrapper;
