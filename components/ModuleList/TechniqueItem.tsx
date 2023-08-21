import { HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { TechniqueFrontMatter } from "../../types/dynamic/techniques";
import Category from "./Category";
import Difficulty from "./Difficulty";
import SaveButton from "./SaveButton";

const TechniqueItem = ({ technique }: { technique: TechniqueFrontMatter }) => {
  return (
    <Link
      className="bg-slate-light px-3.5 py-2 rounded-md"
      href={"/t/" + technique.id}
      key={technique.id}
    >
      <HStack justifyContent="space-between">
        <div>
          {technique.name}
          <div>
            <HStack spacing={1}>
              <Difficulty value={technique.difficulty} />
              <Category>{technique.category}</Category>
            </HStack>
          </div>
        </div>
        <SaveButton id={technique.id} />
      </HStack>
    </Link>
  );
};

export default TechniqueItem;
