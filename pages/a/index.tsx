import { Select, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { AudioSkill, AudioSkillFrontMatter } from "../../types/dynamic/audio";
import { getAllAudioSkillsFrontMatter } from "../../lib/audioSkills";
import AudioSkillItem from "../../components/ModuleList/AudioSkillItem";

const Index = ({ audioSkills }: { audioSkills: AudioSkill[] }) => {
  console.log(audioSkills);
  // console.log(techniques);
  // const [difficulty, setDifficulty] = useState("any");
  // const [category, setCategory] = useState("any");

  return (
    <Wrapper title="Audio Skills">
      {/* Difficulty:
      <Select
        placeholder="Select option"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="any">any</option>
        <option value="med">medium</option>
        <option value="hard">hard</option>
      </Select>
      Category:
      <Select
        placeholder="Select option"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="any">any</option>
        <option value="articulation">articulation</option>
        <option value="harmonics">harmonics</option>
        <option value="basics">basics</option>
        <option value="percussion">percussion</option>
      </Select> */}
      <div className="w-full flex flex-col content-between space-y-3">
        {audioSkills.map((audioSkill: AudioSkillFrontMatter, index: number) => (
          <AudioSkillItem key={index} audioSkill={audioSkill} />
        ))}
      </div>
    </Wrapper>
  );
};

export async function getStaticProps() {
  const audioSkills = getAllAudioSkillsFrontMatter();
  const audioSkillsSorted = audioSkills.sort((a: AudioSkill, b: AudioSkill) =>
    a.name > b.name ? 1 : -1
  );
  return {
    props: {
      audioSkills: audioSkillsSorted,
    },
  };
}

export default Index;
