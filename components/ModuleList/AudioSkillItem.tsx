import { HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AudioSkillFrontMatter } from "../../types/dynamic/audio";
import Category from "./Category";
import Difficulty from "./Difficulty";
import SaveButton from "./SaveButton";

const AudioSkillItem = ({ audioSkill }: { audioSkill: AudioSkillFrontMatter }) => {
  return (
    <Link
      className="bg-bg-light px-3.5 py-2 rounded-md"
      href={"/a/" + audioSkill.id}
      key={audioSkill.id}
    >
      <HStack justifyContent="space-between">
        <div>
          {audioSkill.name}
          <div>
            <HStack spacing={1}>
              <Difficulty value={audioSkill.difficulty} />
              <Category>{audioSkill.category}</Category>
            </HStack>
          </div>
        </div>
        <SaveButton id={audioSkill.id} module="audioSkill" />
      </HStack>
    </Link>
  );
};

export default AudioSkillItem;
