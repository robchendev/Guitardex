import { HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GearNavItem, gearNavItems } from "../config/gear";
import PageTitle from "./PageTitle";
import Wrapper from "./Wrapper";

const GearWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const compareGearPath = (): string => {
    const navItemLinkOnly: string[] = gearNavItems.map((item: GearNavItem) => item.link);
    const indexOfNavItem = navItemLinkOnly.indexOf(router.pathname);
    if (indexOfNavItem < 0) {
      return "Page not found!";
    }
    return gearNavItems[indexOfNavItem].name;
  };

  return (
    <Wrapper>
      <PageTitle title={compareGearPath()} />
      <div className="flex justify-center">
        <div className="w-8/12">
          <HStack alignItems="flex-start">
            <VStack alignItems="flex-start">
              {gearNavItems.map((item: GearNavItem) => (
                <Link href={item.link} key={item.link}>
                  {item.name}
                </Link>
              ))}
            </VStack>
            {children}
          </HStack>
        </div>
      </div>
    </Wrapper>
  );
};

export default GearWrapper;
