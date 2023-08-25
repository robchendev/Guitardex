import { Select, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import SearchBar from "../../components/ModuleList/SearchBar";
import TechniqueItem from "../../components/ModuleList/TechniqueItem";
import Wrapper from "../../components/Wrapper";
import { getAllTechniqueFrontMatter } from "../../lib/techniques";
import { Technique, TechniqueFrontMatter } from "../../types/dynamic/techniques";

const Index = ({ techniques }: { techniques: Technique[] }) => {
  // console.log(techniques);
  // const [difficulty, setDifficulty] = useState("any");
  // const [category, setCategory] = useState("any");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(techniques);
  return (
    <Wrapper title="Techniques">
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
        list={techniques}
        search={search}
        setFilter={(newFilter: Technique[]) => setFilter(newFilter)}
        setSearch={setSearch}
      />
      <VStack w="full" spacing={1.5}>
        {filter.map((technique: TechniqueFrontMatter, index: number) => (
          <TechniqueItem key={index} technique={technique} />
        ))}
      </VStack>
    </Wrapper>
  );
};

export async function getStaticProps() {
  const techniques = getAllTechniqueFrontMatter();
  const basics = techniques
    .filter((technique: Technique) => technique.category === "basics")
    .sort((a: Technique, b: Technique) => (a.name > b.name ? 1 : -1));
  const articulation = techniques
    .filter((technique: Technique) => technique.category === "articulation")
    .sort((a: Technique, b: Technique) => (a.name > b.name ? 1 : -1));
  const harmonics = techniques
    .filter((technique: Technique) => technique.category === "harmonics")
    .sort((a: Technique, b: Technique) => (a.name > b.name ? 1 : -1));
  const percussion = techniques
    .filter((technique: Technique) => technique.category === "percussion")
    .sort((a: Technique, b: Technique) => (a.name > b.name ? 1 : -1));
  const utility = techniques
    .filter((technique: Technique) => technique.category === "utility")
    .sort((a: Technique, b: Technique) => (a.name > b.name ? 1 : -1));
  return {
    props: {
      techniques: [...basics, ...articulation, ...harmonics, ...utility, ...percussion],
    },
  };
}

export default Index;
