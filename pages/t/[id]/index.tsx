import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import { getAllTechniqueIds, getTechniqueData } from "../../../lib/techniques";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { GlossaryItem } from "../../../types";
import { Technique } from "../../../types/dynamic/techniques";
import { PreReq } from "../../../types/dynamic/common";
import RenderMarkdown from "../../../components/ModulePage/RenderMarkdown";

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
    <Wrapper title="Techniques">
      <div className="flex justify-center">
        <div>
          <div>ID: {technique.id}</div>
          <div>Title: {technique.name}</div>
          <div>
            PreReq:{" "}
            {technique.requirements.map((req: PreReq, index: number) => (
              <Link key={index} href={"/t/" + req.id}>
                {req.name}
              </Link>
            ))}
          </div>
          <div>Category: {technique.category}</div>
          <div>Difficulty: {technique.difficulty}</div>
          <div>Demo: {technique.demo}</div>
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
            contentMarkdown={technique.contentMarkdown}
            addToGlossary={addToGlossary}
          />
        </div>
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
