import { HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { MdDragIndicator } from "react-icons/md";
import { Library, ModuleFrontMatter } from "../../types/dynamic/common";
import Category from "../ModuleList/Category";
import Difficulty from "../ModuleList/Difficulty";
import LibraryTag, { LibraryTagMini } from "../ModuleList/LibraryTag";
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
  return (
    <Link className="w-full hover:text-text group relative" href={`/${library}/` + module.id}>
      <div className="absolute h-full flex items-center z-10 -ml-1">
        <MdDragIndicator />
      </div>
      <HStack
        className={"bg-bg rounded-md duration-200 group-hover:ml-3 relative z-20"}
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
              <Difficulty value={module.difficulty} />
              <Category value={module.category} />
            </HStack>
          </div>
        </div>
        <div>
          {/* <SaveButton id={module.id} library={library} isGhost /> */}
          <DeleteButton onDelete={onDelete} />
        </div>
      </HStack>
    </Link>
  );
};

export default DexItem;
