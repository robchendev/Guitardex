/* eslint-disable prettier/prettier */
import {
  Button,
  Card,
  Heading,
  HStack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
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
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            className="mb-"
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
