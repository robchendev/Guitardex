import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import { GlossaryItem } from "../../../types";
import RenderMarkdown from "../../../components/ModulePage/RenderMarkdown";
import ModuleHeader from "../../../components/ModulePage/ModuleHeader";
import { Continuation, Module } from "../../../types/dynamic/common";
import {
  getAllIds,
  getContinuations,
  getGlossaryItems,
  getModuleData,
} from "../../../lib/serverSideFunctions";
import ContinueLearning from "../../../components/ModulePage/ContinueLearning";
import Glossary from "../../../components/ModulePage/Glossary";

const AudioProduction = ({
  moduleData,
  continuations,
  glossaryItems,
}: {
  moduleData: Module;
  continuations: Continuation[];
  glossaryItems: GlossaryItem[];
}) => {
  return (
    <Wrapper>
      <div>
        <ModuleHeader frontmatter={moduleData} library="a" />
        {/* <div>Coming soon</div> */}
        {/* <div>Demo: {moduleData.demo}</div> */}
        <Glossary glossary={glossaryItems} />
        <RenderMarkdown contentMarkdown={moduleData.contentMarkdown} />
        <ContinueLearning
          continuations={continuations}
          library="a"
          id={moduleData.id}
          name={moduleData.name}
        />
      </div>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = getAllIds("a");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data using params.id
  const moduleData = await getModuleData(params.id, "a");
  const glossaryItems: GlossaryItem[] = await getGlossaryItems(moduleData.contentMarkdown);

  const continuations: Continuation[] = await getContinuations(params.id, "a");
  return {
    props: {
      moduleData,
      continuations,
      glossaryItems,
    },
  };
}

export default AudioProduction;
