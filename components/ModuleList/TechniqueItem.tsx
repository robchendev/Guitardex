import { HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { TechniqueFrontMatter } from "../../types/dynamic/techniques";
import Category from "./Category";
import Difficulty from "./Difficulty";
import SaveButton from "./SaveButton";

const TechniqueItem = ({ technique }: { technique: TechniqueFrontMatter }) => {
  return (
    <Link className="w-full hover:text-text-light group" href={"/t/" + technique.id}>
      <div className={"bg-bg-light rounded-md duration-200 group-hover:ml-3"}>
        <HStack justifyContent="space-between" align="stretch">
          <div className="px-3.5 py-2">
            <div>
              <Text as="h1" noOfLines={1} className="font-medium">
                {technique.name}
              </Text>
              <div>
                <HStack spacing={1}>
                  <Difficulty value={technique.difficulty} />
                  <Category value={technique.category} />
                </HStack>
              </div>
            </div>
          </div>
          <div>
            <SaveButton id={technique.id} module="technique" isGhost />
          </div>
        </HStack>
      </div>
    </Link>
  );
};

export default TechniqueItem;
