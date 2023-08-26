import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import {
  getTechniqueContinuations,
  getAllTechniqueFrontMatter,
  getAllTechniqueIds,
  getTechniqueData,
} from "../../../lib/techniques";
import { GlossaryItem } from "../../../types";
import { Technique } from "../../../types/dynamic/techniques";
import RenderMarkdown from "../../../components/ModulePage/RenderMarkdown";
import ModuleHeader from "../../../components/ModulePage/ModuleHeader";
import YoutubePlayer from "../../../components/ModulePage/YoutubePlayer";
import Glossary from "../../../components/ModulePage/Glossary";
import ContinueLearning from "../../../components/ModulePage/ContinueLearning";
import {
  Continuation,
  ModuleContinuation,
  PreReq,
  PreReqExpanded,
} from "../../../types/dynamic/common";

const Technique = ({
  technique,
  continuations,
}: {
  technique: Technique;
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
        <ModuleHeader frontmatter={technique} module="technique" />
        <Glossary glossary={glossary} />
        <YoutubePlayer videoId={technique.demo} />
        <RenderMarkdown contentMarkdown={technique.contentMarkdown} addToGlossary={addToGlossary} />
        <ContinueLearning continuations={continuations} library="technique" />
      </div>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = getAllTechniqueIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data using params.id
  const technique = await getTechniqueData(params.id);
  const continuations: Continuation[] = await getTechniqueContinuations(params.id);
  return {
    props: {
      technique,
      continuations,
    },
  };
}

export default Technique;
