import { HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Library, ModuleFrontMatter } from "../../types/dynamic/common";
import Category from "./Category";
import Difficulty from "./Difficulty";
import SaveButton from "./SaveButton";

const ModuleItem = ({ module, library }: { module: ModuleFrontMatter; library: Library }) => {
  return (
    <Link className="w-full hover:text-text group" href={`/${library}/` + module.id}>
      <HStack
        className={"bg-bg rounded-md duration-200 group-hover:ml-3"}
        justifyContent="space-between"
        align="stretch"
      >
        <div className="px-3.5 py-2">
          <Text as="h1" noOfLines={1} className="font-medium">
            {module.name}
          </Text>
          <div>
            <HStack spacing={1}>
              <Difficulty value={module.difficulty} />
              <Category value={module.category} />
            </HStack>
          </div>
        </div>
        <div>
          <SaveButton id={module.id} library={library} isGhost />
        </div>
      </HStack>
    </Link>
  );
};

export default ModuleItem;
