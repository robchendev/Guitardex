import { Select, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { AudioSkill, AudioSkillFrontMatter } from "../../types/dynamic/audio";
import { getAllAudioSkillsFrontMatter } from "../../lib/audioSkills";
import AudioSkillItem from "../../components/ModuleList/AudioSkillItem";
import SearchBar from "../../components/ModuleList/SearchBar";

const Index = ({ audioSkills }: { audioSkills: AudioSkill[] }) => {
  // console.log(audioSkills);
  // const [difficulty, setDifficulty] = useState("any");
  // const [category, setCategory] = useState("any");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(audioSkills);
  return (
    <Wrapper title="Audio Production">
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
      <SearchBar
        list={audioSkills}
        search={search}
        setFilter={(newFilter: AudioSkill[]) => setFilter(newFilter)}
        setSearch={setSearch}
      />
      <VStack w="full" spacing={1.5}>
        {filter.map((audioSkill: AudioSkillFrontMatter, index: number) => (
          <AudioSkillItem key={index} audioSkill={audioSkill} />
        ))}
      </VStack>
    </Wrapper>
  );
};

export async function getStaticProps() {
  const audioSkills = getAllAudioSkillsFrontMatter();
  const general = audioSkills
    .filter((audioSkill: AudioSkill) => audioSkill.category === "general")
    .sort((a: AudioSkill, b: AudioSkill) => (a.name > b.name ? 1 : -1));
  const recording = audioSkills
    .filter((audioSkill: AudioSkill) => audioSkill.category === "recording")
    .sort((a: AudioSkill, b: AudioSkill) => (a.name > b.name ? 1 : -1));
  const mixing = audioSkills
    .filter((audioSkill: AudioSkill) => audioSkill.category === "mixing")
    .sort((a: AudioSkill, b: AudioSkill) => (a.name > b.name ? 1 : -1));
  const mastering = audioSkills
    .filter((audioSkill: AudioSkill) => audioSkill.category === "mastering")
    .sort((a: AudioSkill, b: AudioSkill) => (a.name > b.name ? 1 : -1));
  return {
    props: {
      audioSkills: [...general, ...recording, ...mixing, ...mastering],
    },
  };
}

export default Index;
