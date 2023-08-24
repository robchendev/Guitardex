import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import { GlossaryItem } from "../../../types";
import { AudioSkill } from "../../../types/dynamic/audio";
import { getAllAudioSkillIds, getAudioSkillData } from "../../../lib/audioSkills";
import RenderMarkdown from "../../../components/ModulePage/RenderMarkdown";
import ModuleHeader from "../../../components/ModulePage/ModuleHeader";

const AudioSkill = ({ audioSkill }: { audioSkill: AudioSkill }) => {
  // console.log(technique);
  const [glossary, setGlossary] = useState<GlossaryItem[]>([]);
  const initialGlossary: GlossaryItem[] = [];

  // add in glossary only if there isn't a duplicate
  const addToGlossary = (term: string, definition: string) => {
    // if an obj with the key matching term not already in glossary, .push()
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
        <ModuleHeader frontmatter={audioSkill} module="audioSkill" />
        <div>Demo: {audioSkill.demo}</div>
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
          contentMarkdown={audioSkill.contentMarkdown}
          addToGlossary={addToGlossary}
        />
      </div>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = getAllAudioSkillIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data using params.id
  const audioSkill = await getAudioSkillData(params.id);
  return {
    props: {
      audioSkill,
    },
  };
}

export default AudioSkill;
