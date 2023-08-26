import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import { GlossaryItem } from "../../../types";
import RenderMarkdown from "../../../components/ModulePage/RenderMarkdown";
import ModuleHeader from "../../../components/ModulePage/ModuleHeader";
import YoutubePlayer from "../../../components/ModulePage/YoutubePlayer";
import Glossary from "../../../components/ModulePage/Glossary";
import ContinueLearning from "../../../components/ModulePage/ContinueLearning";
import { Continuation, Module } from "../../../types/dynamic/common";
import { getAllIds, getContinuations, getModuleData } from "../../../lib/serverSideFunctions";

const Technique = ({
  technique,
  continuations,
}: {
  technique: Module;
  continuations: Continuation[];
}) => {
  const [glossary, setGlossary] = useState<GlossaryItem[]>([]);
  const initialGlossary: GlossaryItem[] = [];

  // add in glossary only if there isn't a duplicate
  const addToGlossary = (term: string, definition: string) => {
    if (!initialGlossary.some((item: GlossaryItem) => item.term === term)) {
      initialGlossary.push({ term, definition });
    }
  };

  useEffect(() => {
    setGlossary(initialGlossary);
  }, []);

  return (
    <Wrapper>
      <div>
        <ModuleHeader frontmatter={technique} library="t" />
        <Glossary glossary={glossary} />
        <YoutubePlayer videoId={technique.demo ?? ""} />
        <RenderMarkdown contentMarkdown={technique.contentMarkdown} addToGlossary={addToGlossary} />
        <ContinueLearning continuations={continuations} library="t" />
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
  const technique = await getModuleData(params.id, "t");
  const continuations: Continuation[] = await getContinuations(params.id, "t");
  return {
    props: {
      technique,
      continuations,
    },
  };
}

export default Technique;
