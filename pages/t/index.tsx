import React from "react";
import { filterAndSort, getAllFrontMatter } from "../../lib/serverSideFunctions";
import ModuleMasterList from "../../components/ModuleList/ModuleMasterList";
import { Module, ModuleFrontMatter } from "../../types/dynamic/common";

const Index = ({ moduleList }: { moduleList: Module[] }) => (
  <ModuleMasterList title="Techniques" moduleList={moduleList} library="t" />
);

export async function getStaticProps() {
  const moduleList = getAllFrontMatter("t") as ModuleFrontMatter[];
  const basics = filterAndSort(moduleList, "basics");
  const articulation = filterAndSort(moduleList, "articulation");
  const harmonics = filterAndSort(moduleList, "harmonics");
  const percussion = filterAndSort(moduleList, "percussion");
  const utility = filterAndSort(moduleList, "utility");
  console.log(percussion);
  return {
    props: {
      moduleList: [...basics, ...articulation, ...harmonics, ...utility, ...percussion],
    },
  };
}

export default Index;
