import { VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import GuitarCard from "../components/GuitarCard";
import Wrapper from "../components/Wrapper";
import { config, GuitarInfo } from "../config/config";

export const Index: NextPage = () => {
  return (
    <Wrapper title="Guitars">
      <VStack divider={<div className="h-px w-full bg-grey-med my-8 lg:my-12" />}>
        {config.guitars.map((guitar: GuitarInfo, index: number) => (
          <GuitarCard key={index} index={index} guitar={guitar} />
        ))}
      </VStack>
    </Wrapper>
  );
};

export default Index;
