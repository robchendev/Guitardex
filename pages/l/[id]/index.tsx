import { HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { getAllLinkIds, getLinkData } from "../../../lib/link";
import { LinkItem, LinkPage } from "../../../types/dynamic/link";

const Link = ({ linkData }: { linkData: LinkPage }) => {
  const imageSrc = "/img/l/" + linkData.imagePath;
  return (
    <div className="text-white-soft w-screen h-screen">
      <div
        className="absolute top-0 left-0 bg-cover w-full h-full bg-repeat blur-xl brightness-75"
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      />
      <VStack spacing={0} className="relative top-0 w-full h-full">
        <Image width={440} height={440} alt={linkData.title} src={imageSrc} />
        <div style={{ width: 440 }} className="bg-black-soft">
          <div className="text-center">{linkData.subtitle}</div>
          {linkData.items.map((item: LinkItem, index: number) => (
            <HStack key={index} className="text-lg" justifyContent="center">
              <div>{item.brandLogo}</div>
              <a href={item.buttonLink}>{item.buttonLabel}</a>
            </HStack>
          ))}
        </div>
      </VStack>
    </div>
  );
};

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = getAllLinkIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data using params.id
  const linkData = getLinkData(params.id);
  return {
    props: {
      linkData,
    },
  };
}

export default Link;
