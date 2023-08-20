import React from "react";
import Wrapper from "../../components/Wrapper";
import { getAllTechniqueFrontMatter } from "../../lib/techniques";
import { Technique } from "../../types/dynamic/techniques";

const index = ({ techniques }: { techniques: Technique[] }) => {
  console.log(techniques);

  return (
    <Wrapper title="techniques">
      {techniques.map((technique: Technique) => (
        <div key={technique.id}>
          {technique.name}, {technique.id}, {technique.difficulty}, {technique.category},{" "}
          {technique.requirements.length}
        </div>
      ))}
    </Wrapper>
  );
};

export async function getStaticProps() {
  const techniques = getAllTechniqueFrontMatter();
  return {
    props: {
      techniques,
    },
  };
}

export default index;
