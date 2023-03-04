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

type ItemComponent = {
  available: "buy" | "discontinued";
  buyLink?: string;
  price?: string;
};

const Component = ({ item }: { item: ItemComponent }) => {
  switch (item.available) {
    case "buy":
      return (
        <a href={item.buyLink} className="bg-rose-600 w-max text-2xl ">
          Buy this for ${item.price}
        </a>
      );
    case "discontinued":
      return (
        <a href={item.buyLink} className="bg-gray-500 w-max text-2xl ">
          Discontinued
        </a>
      );
  }
};

export const Index: NextPage = () => {
  return (
    <Wrapper>
      <div className="flex justify-center    p-4">
        <div className="max-w-4xl">
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            className="mb-16"
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
