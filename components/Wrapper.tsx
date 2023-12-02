import React, { Suspense, lazy } from "react";
import PageTitle, { PageTitleMobile } from "./PageTitle";
import Sidebar from "./Sidebar";
import { FiAlignJustify } from "react-icons/fi";
import { Icon, useDisclosure, Flex, HStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const WrapperDrawer = dynamic(() => import("./WrapperDrawer"), {
  loading: () => <p>Loading...</p>,
});

const Wrapper = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <div className="h-full bg-bg2 lg:py-16 lg:pb-16 lg:hp-24 font-fredoka font-normal tracking-[0.4px] ">
      <HStack
        justifyContent="space-between"
        className="bg-bg2 fixed w-full z-[999] border-b border-text lg:relative lg:!hidden"
      >
        <div className="w-12 h-12" />
        <PageTitleMobile title={title ?? "GuitarDex"} />
        <button ref={btnRef} className="w-12 h-12 m-4 " onClick={onOpen}>
          <Icon w={8} h={8} as={FiAlignJustify} />
        </button>
      </HStack>
      <WrapperDrawer isOpen={isOpen} btnRef={btnRef} onClose={onClose} />
      <div className="h-full max-w-[1100px] m-auto px-8">
        <Flex className="justify-between">
          <div className="hidden lg:block lg:w-1/4 ">
            <Sidebar />
          </div>
          <div className="w-full lg:w-3/4">
            <div className="h-full lg:ml-8 mt-16 lg:mt-0">
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
