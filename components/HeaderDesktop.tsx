import { HStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const HeaderDesktop = () => {
  const router = useRouter();
  return (
    <div className="hidden lg:block">
      <header className="flex text-white-soft p-4 mx-auto lg:max-w-5xl  fixed md:relative md:flex md:justify-between md:items-center md:text-center">
        <Image src="/img/evdm.png" alt="evdm-logo" />
        <HStack>
          {/* {navItems.map((navItem: NavItem, index: number) => (
            <Link
              key={index}
              href={navItem.link}
              className={`sm:block font-serif text-2xl px-3 py-3.5 hover:text-gold ${
                router.pathname === navItem.link ? "text-gold" : ""
              }`}
            >
              {navItem.name}
            </Link>
          ))} */}
        </HStack>
      </header>
    </div>
  );
};

export default HeaderDesktop;
