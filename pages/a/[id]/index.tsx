import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import { GlossaryItem } from "../../../types";
import { AudioProduction } from "../../../types/dynamic/audio";
import { getAllAudioProductionIds, getAudioProductionData } from "../../../lib/audioProduction";
import RenderMarkdown from "../../../components/ModulePage/RenderMarkdown";
import ModuleHeader from "../../../components/ModulePage/ModuleHeader";

const AudioProduction = ({ audioProduction }: { audioProduction: AudioProduction }) => {
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
        <ModuleHeader frontmatter={audioProduction} library="a" />
        <div>Demo: {audioProduction.demo}</div>
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
          contentMarkdown={audioProduction.contentMarkdown}
          addToGlossary={addToGlossary}
        />
      </div>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = getAllAudioProductionIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data using params.id
  const audioProduction = await getAudioProductionData(params.id);
  return {
    props: {
      audioProduction,
    },
  };
}

export default AudioProduction;
