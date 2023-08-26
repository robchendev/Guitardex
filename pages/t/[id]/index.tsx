import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import {
  getAllTechniqueContinuations,
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
import { ModuleContinuation, PreReq, PreReqExpanded } from "../../../types/dynamic/common";

const Technique = ({
  technique,
  allModuleContinuations,
}: {
  technique: Technique;
  allModuleContinuations: ModuleContinuation[];
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
        <ContinueLearning
          continuations={allModuleContinuations[technique.id].continuations}
          library="technique"
        />
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
  const allModuleContinuations = await getAllTechniqueContinuations(params.id);
  return {
    props: {
      technique,
      allModuleContinuations,
    },
  };
}

export default Technique;
