import { Drawer, DrawerContent, DrawerOverlay, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PageTitle, { PageTitleMobile } from "./PageTitle";
import Sidebar from "./Sidebar";
import { FiAlignJustify } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

const Wrapper = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  return (
    <div className="h-full bg-bg2 lg:my-0 lg:hp-24">
      {/* STICKY HEADER F©OR MOBILE*/}
      <div className={"w-full h-16 bg-bg2 lg:!hidden justify-between fixed top-0 "}>
        <div className="flex align-center items-center bg-bg2">
          {/* duplicated button */}
          <button className="">
            <div className="w-10 h-10 bg-[transparent] m-2 "></div>
          </button>
          {/* spacer */}
          <div className="grow"></div>
          {/* title */}
          <PageTitleMobile title={title ?? "Guitardex"}></PageTitleMobile>
          {/* spacer */}
          <div className="grow"></div>
          {/* button */}
          <button ref={btnRef} className="" onClick={onOpen}>
            <div className="w-10 h-10 m-4 ">
              <Icon w={10} h={10} as={FiAlignJustify} />
            </div>
          </button>
        </div>
        <PageTitle title={title ?? "Guitardex"}></PageTitle>
      </div>
      {/* `  */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* Close button */}
          <div className="w-full h-full bg-bg2 overflow-y-auto">
            <div className="flex justify-end w-full">
              <button ref={btnRef} className="ml-auto" onClick={onClose}>
                <div className="w-10 h-10 m-4">
                  <Icon w={10} h={10} as={FaTimes} />
                </div>
              </button>
            </div>
            <div className="mx-4 ">
              <Sidebar />
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <div className="h-10 w-full"></div>

      <div className="h-full max-w-[1100px] m-auto my-0 px-4">
        <Flex className="justify-between">
          <div className={"hidden lg:!block "}>
            <Sidebar />
          </div>
          <div className="lg:hidden"></div>
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
