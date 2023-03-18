import { HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import GearCard from "../../../components/Gear/GearCard";
import GearNav from "../../../components/Gear/GearNav";
import Wrapper from "../../../components/Wrapper";
import { GearItem, gearNavItems } from "../../../config/gear";

const Gear = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const getGearInfo = (): GearItem | null => {
    const navItemIds: string[] = gearNavItems.map((item: GearItem) => item.id);
    const indexOfNavItem = navItemIds.indexOf(id);
    if (indexOfNavItem < 0) {
      return null;
    }
    return gearNavItems[indexOfNavItem];
  };

  const gearItem = getGearInfo();

  // This has a bit of FOUC due to unloaded data
  return (
    <Wrapper title="Gear">
      <div className="flex justify-center">
        <HStack spacing="8" alignItems="flex-start" className="w-8/12">
          <GearNav />
          <GearCard sections={gearItem?.sections ?? gearNavItems[0].sections} />
        </HStack>
      </div>
    </Wrapper>
  );
};

export default Gear;
