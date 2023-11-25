import React, { Suspense } from "react";
import PageTitle, { PageTitleMobile } from "./PageTitle";
import Sidebar from "./Sidebar";
import { FiAlignJustify } from "react-icons/fi";
import { Icon, useDisclosure, Flex } from "@chakra-ui/react";

const WrapperDrawer = React.lazy(() => import("./WrapperDrawer"));

const Wrapper = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <div className="h-full bg-bg2 lg:my-0 lg:hp-24 font-fredoka font-normal tracking-[0.4px]">
      <div className=" flex justify-end w-full h-16 lg:!hidden fixed top-0">
        <div className="w-[10px] h-[10px] m-4" />
        <PageTitleMobile title={title ?? "GuitarDex"} />
        <button ref={btnRef} className="w-10 h-10 m-4 " onClick={onOpen}>
          <Icon w={10} h={10} as={FiAlignJustify} />
        </button>
        <PageTitle title={title ?? "Guitardex"}></PageTitle>
      </div>
      <Suspense>
        <WrapperDrawer isOpen={isOpen} btnRef={btnRef} onClose={onClose} />
      </Suspense>

      <div className="h-10 w-full"></div>

      <div className="h-full max-w-[1100px] m-auto my-0 px-4">
        <Flex className="justify-between">
          <div className="hidden lg:!block ">
            <Sidebar />
          </div>
          <div className="w-full lg:w-3/4">
            <div className="h-full lg:ml-8 mt-10">
              <div className="hidden lg:block">{title && <PageTitle title={title} />}</div>
              {children}
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Wrapper;
