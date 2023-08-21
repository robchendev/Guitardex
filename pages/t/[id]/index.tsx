import React from "react";
import Wrapper from "../../../components/Wrapper";
import { getAllTechniqueIds, getTechniqueData } from "../../../lib/techniques";
import { PreReq, Technique } from "../../../types/dynamic/techniques";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";

const Technique = ({ technique }: { technique: Technique }) => {
  // console.log(technique);
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

          <ReactMarkdown
            components={{
              img: (props) => {
                // This is hack to transform ![]() to anything we need
                switch (props.alt) {
                  default:
                  case "tab":
                    return (
                      <Image
                        src={props.src ?? ""}
                        alt={technique?.name + " tab"}
                        // TODO: Need a suitable blur image placeholder
                        // placeholder="blur"
                        // blurDataURL={props.src}
                        width={1200}
                        height={200}
                        // TODO: Need hardcoded filter
                        className="w-full h-full tab-filter-light"
                      />
                    );
                }
              },
              code: (props) => {
                const str = (props.children[0] ?? "") as string;
                const [t, d] = str.split("|");
                const term = t.trim();
                const definition = d.trim();
                return (
                  // TODO: Tooltip
                  <span className="text-purple-dark">
                    {term}={definition}
                  </span>
                );
              },
            }}
          >
            {technique.contentMarkdown}
          </ReactMarkdown>
          {/* <div dangerouslySetInnerHTML={{ __html: techniques.contentHtml }} /> */}
          {/* {techniques?.map((technique: Technique) => ( */}
          {/* <div key={technique.id}>This is a technique</div> */}
          {/* ))} */}
          <div>{/* Need to update TechniquesNav if adding to category */}</div>
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
