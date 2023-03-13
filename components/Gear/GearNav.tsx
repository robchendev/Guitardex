import { VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { GearItem } from "../../config/gear";
import { gearNavItems as items } from "../../config/gear";

const GearNav = () => {
  return (
    <VStack alignItems="flex-start">
      {items.map((item: GearItem) => (
        <Link href={item.id} key={item.id}>
          {item.name}
        </Link>
      ))}
    </VStack>
  );
};

export default GearNav;
