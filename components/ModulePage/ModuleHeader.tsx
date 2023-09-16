import { HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Library, ModuleFrontMatter, PreReq } from "../../types/dynamic/common";
import Category, { capitalize } from "../ModuleList/Category";
import Difficulty from "../ModuleList/Difficulty";
import LibraryTag from "../ModuleList/LibraryTag";
import SaveButton from "../ModuleList/SaveButton";

const ModuleHeader = ({
  frontmatter,
  library,
}: {
  frontmatter: ModuleFrontMatter;
  library: Library;
}) => {
  return (
    <>
      <div className="bg-bg px-4 py-2.5 rounded-lg mb-4">
        <HStack justifyContent="space-between">
          <div>
            <h1 className="text-xl font-medium tracking-wider">{frontmatter.name}</h1>
            <p className="text-base mb-1">
              Required:{" "}
              {frontmatter.requirements.map((req: PreReq, index: number) => (
                <span key={index}>
                  {index > 0 && ", "}
                  <Link
                    href={`/${library}/` + req.id}
                    className="text-link hover:bg-link hover:text-bg transition-none"
                  >
                    {library === "a" && req.category && req.category !== "general"
                      ? `${capitalize(req.category)}: ${req.name}`
                      : req.name}
                  </Link>
                </span>
              ))}
              {!frontmatter.requirements.length && "None"}
            </p>
            <HStack spacing={1}>
              <Difficulty value={frontmatter.difficulty} />
              <LibraryTag library={library} />
              <Category value={frontmatter.category} />
            </HStack>
          </div>
          <SaveButton id={frontmatter.id} library={library} />
        </HStack>
      </div>
    </>
  );
};

export default ModuleHeader;
