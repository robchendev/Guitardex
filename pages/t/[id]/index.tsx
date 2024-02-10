import React from "react";
import Wrapper from "../../../components/Wrapper";
import { GlossaryItem } from "../../../types";
import RenderMarkdown from "../../../components/ModulePage/RenderMarkdown";
import ModuleHeader from "../../../components/ModulePage/ModuleHeader";
import YoutubePlayer from "../../../components/ModulePage/YoutubePlayer";
import Glossary from "../../../components/ModulePage/Glossary";
import ContinueLearning from "../../../components/ModulePage/ContinueLearning";
import { Continuation, Module } from "../../../types/dynamic/common";
import {
  getAllIds,
  getContinuations,
  getGlossaryItems,
  getModuleData,
} from "../../../lib/serverSideFunctions";

const Technique = ({
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
        <ModuleHeader frontmatter={moduleData} library="t" />
        <Glossary glossary={glossaryItems} />
        {/* Key here makes the video re-render along with the rest of the page */}
        <YoutubePlayer key={moduleData.id} videoId={moduleData.demo ?? ""} />
        <RenderMarkdown contentMarkdown={moduleData.contentMarkdown} />
        <ContinueLearning
          continuations={continuations}
          library="t"
          id={moduleData.id}
          name={moduleData.name}
        />
      </div>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = getAllIds("t");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data using params.id
  const moduleData = await getModuleData(params.id, "t");
  const continuations: Continuation[] = await getContinuations(params.id, "t");
  const glossaryItems: GlossaryItem[] = await getGlossaryItems(moduleData.contentMarkdown);
  return {
    props: {
      moduleData,
      continuations,
      glossaryItems,
    },
  };
}

export default Technique;
