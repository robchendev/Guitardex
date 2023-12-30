import { NextPage } from "next";
import React from "react";
import DexMasterList from "../components/Dex/DexMasterList";
import Wrapper from "../components/Wrapper";
import { getAllFrontMatter } from "../lib/serverSideFunctions";
import { libraries, Library, ModuleFrontMatter, ModuleLists } from "../types/dynamic/common";
import { createInitialModuleList } from "../utils/guitardex";

const Index: NextPage = ({ moduleLists }: { moduleLists: ModuleLists }) => {
  return (
    <Wrapper title="My Guitardex">
      <DexMasterList moduleLists={moduleLists} />
    </Wrapper>
  );
};

export async function getStaticProps() {
  const moduleLists: ModuleLists = createInitialModuleList();
  for (const key of libraries as unknown as Library[]) {
    moduleLists[key] = getAllFrontMatter(key) as ModuleFrontMatter[];
  }
  return {
    props: {
      moduleLists: moduleLists,
    },
  };
}

export default Index;
