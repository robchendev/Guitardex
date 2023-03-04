import { HStack, Image, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { navItems, NavItem, SocialIcon, icons } from "../config/config";
import LinkIcon from "./LinkIcon";
import PageTitle from "./PageTitle";

const Header = () => {
  return (
    <header className="text-white-soft p-4 mx-auto md:w-8/12 max-w-7xl fixed md:relative md:flex md:justify-between md:items-center md:text-center">
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
            className="font-serif text-2xl px-5 py-3.5 hover:text-gold"
          >
            {navItems.name}
          </Link>
        ))}
      </HStack>
    </header>
  );
};

const Footer = () => {
  return (
    <div className="w-full justify-center flex text-white-soft mt-4 pb-8">
      <footer className="container flex items-center justify-center mx-auto mb-6 h-fit text-center">
        <VStack spacing={0} className=" text-white-soft w-2/6">
          <div className="h-px w-full bg-grey-hard mb-14" />
          <div className="font-serif mt-14">
            <HStack className="justify-center mb-5">
              {icons.map((icon: SocialIcon, index: number) => (
                <LinkIcon key={index} icon={icon.icon} link={icon.link} />
              ))}
            </HStack>
            <div>© 2018-2023 Eddie van der Meer</div>
            <div>
              <Link className="text-gold" href="#">
                Privacy Policy
              </Link>
               • 
              <Link className="text-gold" href="#">
                Cookie Policy
              </Link>
            </div>
          </div>
        </VStack>
      </footer>
    </div>
  );
};

const Wrapper = ({
  children,
  hasFooter = true,
  title,
}: {
  children: React.ReactNode;
  hasFooter?: boolean;
  title?: string;
}) => {
  return (
    <div className="bg-black-soft text-white-soft flex flex-col h-screen justify-between">
      <Header />
      <main className="font-serif lg:max-w-4xl lg:mx-auto mb-auto w-full">
        {title && <PageTitle title={title} />}
        {children}
      </main>
      {hasFooter && <Footer />}
    </div>
  );
};

export default Wrapper;
