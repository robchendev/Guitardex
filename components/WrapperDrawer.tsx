import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Icon,
} from "@chakra-ui/react";
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
    // bg="linear-gradient(70deg, #444 0%, #212121 45%, #171717 100%)"
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton color="black" boxSize={10} size="4xl" mt={1} />
      <DrawerBody className="bg-bg" padding={0}>
        <Sidebar />
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);

export default WrapperDrawer;
