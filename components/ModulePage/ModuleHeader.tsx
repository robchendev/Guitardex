import { HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AudioSkillFrontMatter } from "../../types/dynamic/audio";
import { Module, PreReq } from "../../types/dynamic/common";
import { TechniqueFrontMatter } from "../../types/dynamic/techniques";
import Category from "../ModuleList/Category";
import Difficulty from "../ModuleList/Difficulty";
import ModuleTag from "../ModuleList/ModuleTag";
import SaveButton from "../ModuleList/SaveButton";

const ModuleHeader = ({
  frontmatter,
  module,
}: {
  frontmatter: AudioSkillFrontMatter | TechniqueFrontMatter;
  module: Module;
}) => {
  return (
    <>
      <div className="bg-bg-light px-4 py-2.5 rounded-lg mb-4">
        <HStack justifyContent="space-between">
          <div>
            <h1 className="text-xl font-medium tracking-wider">{frontmatter.name}</h1>
            <p className="text-base">
              Required:{" "}
              {frontmatter.requirements.map((req: PreReq, index: number) => (
                <Link
                  key={index}
                  href={"/t/" + req.id}
                  className="text-base text-purple hover:bg-purple transition-none"
                >
                  {req.name}
                </Link>
              ))}
              {!frontmatter.requirements.length && "None"}
            </p>
            <HStack spacing={1}>
              <Difficulty value={frontmatter.difficulty} />
              <ModuleTag module={module} />
              <Category value={frontmatter.category} />
            </HStack>
          </div>
          <SaveButton id={frontmatter.id} module={module} />
        </HStack>
      </div>
    </>
  );
};

export default ModuleHeader;
