import React from "react";
import { getAllFrontMatter, orderAudioProductionModuleList } from "../../lib/serverSideFunctions";
import ModuleMasterList from "../../components/ModuleList/ModuleMasterList";
import { Module, ModuleFrontMatter } from "../../types/dynamic/common";

const Index = ({ moduleList }: { moduleList: Module[] }) => (
  <ModuleMasterList title="Audio Production" moduleList={moduleList} library="a" />
);

export async function getStaticProps() {
  const moduleList = getAllFrontMatter("a") as ModuleFrontMatter[];
  const orderedModuleList = orderAudioProductionModuleList(moduleList);
  return {
    props: {
      moduleList: orderedModuleList,
    },
  };
}

export default Index;
