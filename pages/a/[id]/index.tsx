import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import { GlossaryItem } from "../../../types";
import RenderMarkdown from "../../../components/ModulePage/RenderMarkdown";
import ModuleHeader from "../../../components/ModulePage/ModuleHeader";
import { Continuation, Module } from "../../../types/dynamic/common";
import { getAllIds, getContinuations, getModuleData } from "../../../lib/serverSideFunctions";
import ContinueLearning from "../../../components/ModulePage/ContinueLearning";

const AudioProduction = ({
  moduleData,
  continuations,
}: {
  moduleData: Module;
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
    initialGlossary.sort((a: GlossaryItem, b: GlossaryItem) => (a.term < b.term ? 1 : -1));
    setGlossary(initialGlossary);
  }, [moduleData]);

  return (
    <Wrapper>
      <div>
        <ModuleHeader frontmatter={moduleData} library="a" />
        {/* <div>Coming soon</div> */}
        <div>Demo: {moduleData.demo}</div>
        <div>
          <div>Glossary: </div>
          <ul>
            {glossary.map((item: GlossaryItem, index: number) => (
              <li key={index}>
                {item.term}: {item.definition}
              </li>
            ))}
          </ul>
        </div>
        <RenderMarkdown
          contentMarkdown={moduleData.contentMarkdown}
          addToGlossary={addToGlossary}
        />
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
  const continuations: Continuation[] = await getContinuations(params.id, "a");
  return {
    props: {
      moduleData,
      continuations,
    },
  };
}

export default AudioProduction;
