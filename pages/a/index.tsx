import React from "react";
import { filterAndSort, getAllFrontMatter } from "../../lib/serverSideFunctions";
import ModuleMasterList from "../../components/ModuleList/ModuleMasterList";
import { Module, ModuleFrontMatter } from "../../types/dynamic/common";

const Index = ({ moduleList }: { moduleList: Module[] }) => (
  <ModuleMasterList title="Audio Production" moduleList={moduleList} library="a" />
);

export async function getStaticProps() {
  const moduleList = getAllFrontMatter("a") as ModuleFrontMatter[];
  // TODO: Might change ordering method for audio production modules
  const general = filterAndSort(moduleList, "general");
  const recording = filterAndSort(moduleList, "recording");
  const mixing = filterAndSort(moduleList, "mixing");
  const mastering = filterAndSort(moduleList, "mastering");
  return {
    props: {
      moduleList: [...general, ...recording, ...mixing, ...mastering],
    },
  };
}

export default Index;
