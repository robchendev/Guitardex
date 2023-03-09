import { HStack, Image, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { navItems, NavItem } from "../config/config";

const HeaderDesktop = () => {
  const router = useRouter();
  return (
    <div className="sm:display-none md:display-flex bg-gold">
      <header className=" flex text-white-soft p-4 mx-auto md:w-8/12 max-w-7xl fixed md:relative md:flex md:justify-between md:items-center md:text-center">
        <Image
          src="public/img/evdm.png"
          fallbackSrc="https://eddievdmeer.com/wp-content/uploads/elementor/thumbs/cropped-evdmlogo-oqa4dzno6q4ah9xd5u0hy03itfxfgiimm19em295vk.png"
          alt="evdm-logo"
          className="sm:display-none md:display-flex"
        />
        <HStack>
          {navItems.map((navItem: NavItem, index: number) => (
            <Link
              key={index}
              href={navItem.link}
              className={`sm:hidden md:hiden  lg:block font-serif text-2xl px-5 py-3.5 hover:text-gold${
                router.pathname === navItem.link ? " text-gold" : ""
              }`}
            >
              {navItem.name}
            </Link>
          ))}
        </HStack>
      </header>
    </div>
  );
};

export default HeaderDesktop;
