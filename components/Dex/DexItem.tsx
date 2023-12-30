import { HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { disableAudioProductionModules } from "../../config/disabled";
import { Library, ModuleFrontMatter } from "../../types/dynamic/common";
import Category from "../ModuleList/Category";
import Difficulty from "../ModuleList/Difficulty";
import DeleteButton from "./DeleteButton";

const DexItem = ({
  module,
  library,
  onDelete,
}: {
  module: ModuleFrontMatter;
  library: Library;
  onDelete: (e) => void;
}) => {
  const ModuleItemInner = () => (
    <HStack
      className={"bg-bg rounded-md duration-200 group-hover:ml-3 relative z-2"}
      justifyContent="space-between"
      align="stretch"
    >
      <div className="px-3.5 py-2">
        <Text as="h1" noOfLines={1} className="font-medium">
          {module.name}
        </Text>
        <div>
          <HStack spacing={1}>
            {/* <LibraryTagMini library={library} /> */}
            {module.difficulty && <Difficulty value={module.difficulty} />}
            <Category value={module.category} />
          </HStack>
        </div>
      </div>
      <div>
        {/* <SaveButton id={module.id} library={library} isGhost /> */}
        <DeleteButton onDelete={onDelete} />
      </div>
    </HStack>
  );
  // Disable certain modules
  if (disableAudioProductionModules && library === "a" && module.category !== "demo") {
    return (
      <div className="relative w-full opacity-50 hover:cursor-grab">
        <div className="diagonal-stripes z-10" />
        {ModuleItemInner()}
      </div>
    );
  }
  return (
    <Link
      className="w-full hover:text-text group relative hover:cursor-grab"
      href={`/${library}/` + module.id}
    >
      {/* Using {ModuleItemInner()} instead of <ModuleItemInner /> because the latter causes event propogation issues */}
      {ModuleItemInner()}
    </Link>
  );
};

export default DexItem;
