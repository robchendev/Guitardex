import { HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AudioSkillFrontMatter } from "../../types/dynamic/audio";
import Category from "./Category";
import Difficulty from "./Difficulty";
import SaveButton from "./SaveButton";

const AudioSkillItem = ({ audioSkill }: { audioSkill: AudioSkillFrontMatter }) => {
  return (
    <Link className="w-full hover:text-text-light group" href={"/a/" + audioSkill.id}>
      <div className={"bg-bg-light rounded-md duration-200 group-hover:ml-3"}>
        <HStack justifyContent="space-between" align="stretch">
          <div className="px-3.5 py-2">
            <div>
              <h2 className="font-medium">{audioSkill.name}</h2>
              <div>
                <HStack spacing={1}>
                  <Difficulty value={audioSkill.difficulty} />
                  <Category value={audioSkill.category} />
                </HStack>
              </div>
            </div>
          </div>
          <SaveButton id={audioSkill.id} module="audioSkill" isGhost />
        </HStack>
      </div>
    </Link>
  );
};

export default AudioSkillItem;
