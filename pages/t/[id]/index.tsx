import React from "react";
import Wrapper from "../../../components/Wrapper";
import { getAllTechniqueIds, getTechniqueData } from "../../../lib/techniques";
import { Technique } from "../../../types/dynamic/techniques";

const Techniques = ({ techniques }: { techniques: Technique }) => {
  console.log(techniques);
  return (
    <Wrapper title="Techniques">
      <div className="flex justify-center">
        Techniques!
        {/* {techniques?.map((technique: Technique) => ( */}
        {/* <div key={technique.id}>This is a technique</div> */}
        {/* ))} */}
        <div>{/* Need to update TechniquesNav if adding to category */}</div>
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
  const techniques = getTechniqueData(params.id);
  return {
    props: {
      techniques,
    },
  };
}

export default Techniques;
