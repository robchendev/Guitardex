import Link from "next/link";
import React from "react";
import { AudioSkillFrontMatter } from "../../types/dynamic/audio";
import { PreReq } from "../../types/dynamic/common";
import { TechniqueFrontMatter } from "../../types/dynamic/techniques";

const ModuleHeader = ({
  frontmatter,
}: {
  frontmatter: AudioSkillFrontMatter | TechniqueFrontMatter;
}) => {
  return (
    <>
      <div>ID: {frontmatter.id}</div>
      <div>Title: {frontmatter.name}</div>
      <div>
        PreReq:{" "}
        {frontmatter.requirements.map((req: PreReq, index: number) => (
          <Link key={index} href={"/t/" + req.id}>
            {req.name}
          </Link>
        ))}
      </div>
      <div>Category: {frontmatter.category}</div>
      <div>Difficulty: {frontmatter.difficulty}</div>
    </>
  );
};

export default ModuleHeader;
