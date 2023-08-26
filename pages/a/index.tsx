import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { AudioProduction, AudioProductionFrontMatter } from "../../types/dynamic/audio";
import SearchBar from "../../components/ModuleList/SearchBar";
import { getAllAudioProductionFrontMatter } from "../../lib/audioProduction";
import AudioProductionItem from "../../components/ModuleList/AudioProductionItem";

const Index = ({ audioProduction }: { audioProduction: AudioProduction[] }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(audioProduction);
  return (
    <Wrapper title="Audio Production">
      <SearchBar
        list={audioProduction}
        search={search}
        setFilter={(newFilter: AudioProduction[]) => setFilter(newFilter)}
        setSearch={setSearch}
      />
      <VStack w="full" spacing={1.5}>
        {filter.map((audioProduction: AudioProductionFrontMatter, index: number) => (
          <AudioProductionItem key={index} audioProduction={audioProduction} />
        ))}
      </VStack>
    </Wrapper>
  );
};

export async function getStaticProps() {
  const audioProduction = getAllAudioProductionFrontMatter();
  const general = audioProduction
    .filter((audioProduction: AudioProduction) => audioProduction.category === "general")
    .sort((a: AudioProduction, b: AudioProduction) => (a.name > b.name ? 1 : -1));
  const recording = audioProduction
    .filter((audioProduction: AudioProduction) => audioProduction.category === "recording")
    .sort((a: AudioProduction, b: AudioProduction) => (a.name > b.name ? 1 : -1));
  const mixing = audioProduction
    .filter((audioProduction: AudioProduction) => audioProduction.category === "mixing")
    .sort((a: AudioProduction, b: AudioProduction) => (a.name > b.name ? 1 : -1));
  const mastering = audioProduction
    .filter((audioProduction: AudioProduction) => audioProduction.category === "mastering")
    .sort((a: AudioProduction, b: AudioProduction) => (a.name > b.name ? 1 : -1));
  return {
    props: {
      audioProduction: [...general, ...recording, ...mixing, ...mastering],
    },
  };
}

export default Index;
