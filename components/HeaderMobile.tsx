import {
  VStack,
  Image,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Icon,
  DrawerCloseButton,
  DrawerOverlay,
  Box,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiMenu } from "react-icons/bi";
import { navItems, NavItem } from "../config/config";
import { PageTitleMobile } from "./PageTitle";

const HeaderMobile = ({ title }: { title: string }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <div className="sm:block lg:hidden ">
      <header className="flex text-white-soft p-4 mx-auto md:w-full justify-between items-center text-center">
        <Box w={12}>
          <Image src="/img/evdm.png" alt="evdm-logo" h={12} />
        </Box>
        <PageTitleMobile title={title} />
        <Button
          ref={btnRef}
          colorScheme=""
          onClick={onOpen}
          h={12}
          w={12}
          justifyContent="flex-start"
        >
          <Icon as={BiMenu} w={10} h={10} />
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color="white" boxSize={10} size="4xl" mt={1} />
            <DrawerBody
              className="bg-black-soft"
              bg="linear-gradient(70deg, #444 0%, #212121 45%, #171717 100%)"
            >
              <VStack spacing={6} mt={14}>
                {navItems.map((navItem: NavItem, index: number) => (
                  <Link
                    key={index}
                    href={navItem.link}
                    className={`block font-serif w-full text-right text-2xl ${
                      router.pathname === navItem.link ? "text-gold" : "text-white-soft"
                    }`}
                  >
                    {navItem.name}
                  </Link>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </header>
    </div>
  );
};

export default HeaderMobile;
