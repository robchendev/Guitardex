import React from "react";
import Wrapper from "../../../components/Wrapper";
import { getAllGearIds, getGearData } from "../../../lib/gear";
import { GearItem } from "../../../types/dynamic/gear";

const Gear = ({ gearData }: { gearData: GearItem }) => {
  return (
    <Wrapper title="Gear">
      <div className="flex justify-center">
        <div>{/* Need to update GearNav if adding to category */}</div>
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
