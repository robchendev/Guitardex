import { HStack } from "@chakra-ui/react";
import React from "react";
import GearCard from "../../../components/Gear/GearCard";
import GearNav from "../../../components/Gear/GearNav";
import Wrapper from "../../../components/Wrapper";
import { getAllGearIds, getGearData } from "../../../lib/gear";
import { GearItem } from "../../../types/dynamic/gear";

const Gear = ({ gearData }: { gearData: GearItem }) => {
  return (
    <Wrapper title="Gear">
      <div className="flex justify-center">
        <HStack spacing="8" alignItems="flex-start" className="w-8/12">
          {/* Need to update GearNav if adding to category */}
          <GearNav />
          <GearCard sections={gearData?.sections} />
        </HStack>
      </div>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = getAllGearIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data using params.id
  const gearData = getGearData(params.id);
  return {
    props: {
      gearData,
    },
  };
}

export default Gear;
