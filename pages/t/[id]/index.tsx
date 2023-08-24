import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import { getAllTechniqueIds, getTechniqueData } from "../../../lib/techniques";
import { GlossaryItem } from "../../../types";
import { Technique } from "../../../types/dynamic/techniques";
import RenderMarkdown from "../../../components/ModulePage/RenderMarkdown";
import ModuleHeader from "../../../components/ModulePage/ModuleHeader";
import YoutubePlayer from "../../../components/ModulePage/YoutubePlayer";

const Technique = ({ technique }: { technique: Technique }) => {
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
        <ModuleHeader frontmatter={technique} module="technique" />
        <YoutubePlayer videoId={technique.demo} />
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
        <RenderMarkdown contentMarkdown={technique.contentMarkdown} addToGlossary={addToGlossary} />
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
  return {
    props: {
      technique,
    },
  };
}

export default Technique;
