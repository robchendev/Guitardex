import React from "react";
import { Drawer, DrawerContent, DrawerOverlay, Icon } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";

interface WrapperDrawerProps {
  isOpen: boolean;
  btnRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
}

const WrapperDrawer: React.FC<WrapperDrawerProps> = ({ isOpen, btnRef, onClose }) => (
  <Drawer
    isOpen={isOpen}
    placement="right"
    onClose={onClose}
    finalFocusRef={btnRef}
    autoFocus={false}
  >
    <DrawerOverlay />
    <DrawerContent>
      <div className="w-full h-full bg-bg2 overflow-y-auto">
        <div className="flex justify-end w-full">
          <button ref={btnRef} className="ml-auto" onClick={onClose}>
            <Icon w={10} h={10} as={FaTimes} />
          </button>
        </div>
        <Sidebar />
      </div>
    </DrawerContent>
  </Drawer>
);

export default WrapperDrawer;
