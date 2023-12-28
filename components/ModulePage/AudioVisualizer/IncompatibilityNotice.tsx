import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const IncompatibilityNotice = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [incompatibilities, setIncompatibility] = useState({
    isIOS: false,
  });
  useEffect(() => {
    const testedIncompatibilities = { ...incompatibilities };
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // console.log("is no");
      testedIncompatibilities.isIOS = true;
    }
    setIncompatibility(testedIncompatibilities);
  }, []);

  return (
    <div>
      {Object.values(incompatibilities).some((val) => val === true) && (
        <button onClick={onOpen}>
          <HStack spacing={1} className="text-purple hover:text-purpleHover">
            <HiOutlineExclamationCircle size={18} />
            <span className="">Not working?</span>
          </HStack>
        </button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="font-fredoka" pb={0} fontWeight={500}>
            Incompatibility Issues
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={3} className="font-fredoka">
            {incompatibilities.isIOS && (
              <div>
                iOS devices require Silent Mode to be turned off to play this audio. To circumvent
                this restriction, you can also wear headphones.
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default IncompatibilityNotice;
