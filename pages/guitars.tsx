/* eslint-disable prettier/prettier */
import { VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import GuitarCard from "../components/GuitarCard";
import Wrapper from "../components/Wrapper";
import { config, GuitarInfo } from "../config/config";

export const Index: NextPage = () => {
  return (
    <Wrapper title="guitars">
      <div className="flex justify-center p-4">
        <div className="max-w-4xl">
          <VStack
            divider={<div className="h-px w-full bg-grey-med" />}
            spacing={4}
          >
            {config.guitars.map((guitar: GuitarInfo, index: number) => (
              <GuitarCard key={index} index={index} guitar={guitar} />
            ))}
          </VStack>
        </div>
      </div>
    </Wrapper>
  );
};

export default Index;
