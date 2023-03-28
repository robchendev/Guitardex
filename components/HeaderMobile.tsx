import {
  VStack,
  Image,
  Link,
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
      <header className="flex text-white-soft p-4 mx-auto md:w-full max-w-7xl justify-between items-center text-center">
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
        <Drawer isOpen={isOpen} placement="top" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay mt={4}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>
                <VStack>
                  {navItems.map((navItem: NavItem, index: number) => (
                    <Link
                      key={index}
                      href={navItem.link}
                      className={`font-serif text-2xl px-5 py-3.5 hover:text-gold${
                        router.pathname === navItem.link ? " text-purple-soft" : ""
                      }`}
                    >
                      {navItem.name}
                    </Link>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </header>
    </div>
  );
};

export default HeaderMobile;
