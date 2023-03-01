import { HStack, Image, Icon, Container, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { navItems, NavItem, SocialIcon, icons } from "../config/config";

const Wrapper = ({
  children,
  hasFooter = true,
}: {
  children: React.ReactNode;
  hasFooter?: boolean;
}) => {
  return (
    <div className="bg-zinc-900 ">
      <div>
        <header className=" text-gray-50 p-4 mx-auto md:w-8/12 max-w-7xl fixed md:relative md:flex md:justify-between md:items-center md:text-center">
          <Image
            src="public/img/evdm.png"
            fallbackSrc="https://eddievdmeer.com/wp-content/uploads/elementor/thumbs/cropped-evdmlogo-oqa4dzno6q4ah9xd5u0hy03itfxfgiimm19em295vk.png"
            alt="evdm-logo"
          ></Image>
          <HStack>
            {navItems.map((navItems: NavItem, index: number) => (
              <Link
                key={index}
                href={navItems.link}
                className="font-serif text-2xl px-5 py-3.5 hover:text-amber-200"
              >
                {navItems.name}
              </Link>
            ))}
          </HStack>
        </header>
      </div>
      <main className="text-gray-50 font-serif">{children}</main>
      {hasFooter && (
        <div className="w-full justify-center flex text-gray-50">
          <footer className="container flex items-center justify-center mx-auto h-32 text-center">
            <VStack spacing={0} className=" text-gray-50 w-2/6 ">
              <div className="h-px w-full bg-gray-50"></div>
              <div className="py-16 bg font-serif ">
                <HStack className="justify-center mb-5">
                  {icons.map((icon: SocialIcon, index: number) => (
                    <a key={index} href={icon.link}>
                      <Icon as={icon.icon} className="text-3xl p-0.5 " />
                    </a>
                  ))}
                </HStack>
                <div>© 2018-2023 Eddie van der Meer</div>
                <div>
                  <a className="inline text-amber-200">Privacy Policy</a>
                   • 
                  <a className="inline text-amber-200">Cookie Policy</a>
                </div>
              </div>
            </VStack>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Wrapper;
