import {
  VStack,
  Image,
  Link,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Icon,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaAlignJustify } from "react-icons/fa";
import { navItems, NavItem } from "../config/config";

const HeaderMobile = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <div className="sm:block lg:hidden ">
      <header className=" flex text-white-soft p-4 px-10 mx-auto md:w-full max-w-7xl justify-between items-center text-center">
        <Image
          src="public/img/evdm.png"
          fallbackSrc="https://eddievdmeer.com/wp-content/uploads/elementor/thumbs/cropped-evdmlogo-oqa4dzno6q4ah9xd5u0hy03itfxfgiimm19em295vk.png"
          alt="evdm-logo"
        />
        <Button ref={btnRef} colorScheme="" onClick={onOpen}>
          <Icon as={FaAlignJustify} w={10} h={10} />
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
