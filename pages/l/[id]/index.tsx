import { Box, HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import DynaImage from "../../../components/DynaImage";
import { getAllLinkIds, getLinkData } from "../../../lib/link";
import { LinkItem, LinkPage } from "../../../types/dynamic/link";

const Link = ({ linkData }: { linkData: LinkPage }) => {
  const imageSrc = "/img/l/" + linkData.imagePath;
  return (
    <div className="text-white-soft w-screen h-screen">
      <div
        className="hidden md:block absolute top-0 left-0 bg-cover w-full h-full bg-repeat blur-xl brightness-75"
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      />
      <VStack spacing={0} className="relative top-0 w-full h-full">
        <Image width={440} height={440} alt={linkData.title} src={imageSrc} />
        <Box width={{ base: "100%", sm: 440 }} className=" bg-white-soft">
          {/* grouped together because it shows the white bg between them */}
          <div className="bg-black-soft pt-4 pb-5 px-4">
            <div className="text-center text-3xl w-full text-white-soft">{linkData.title}</div>
            <div className="text-center text-xl w-full text-white-ghost">{linkData.subtitle}</div>
          </div>
          <VStack divider={<div className="w-full h-px bg-white-ghost"></div>}>
            {linkData.items.map((item: LinkItem, index: number) => (
              <HStack key={index} className="text-lg p-4 w-full" justifyContent="space-between">
                {/* <div>{item.brandLogo}</div> */}
                <DynaImage prop={item.brandLogo} />
                <a
                  className="text-grey-med text-md rounded-md border border-white-ghost px-2 py-1 hover:text-grey-med"
                  href={item.buttonLink}
                >
                  Play
                </a>
              </HStack>
            ))}
          </VStack>
        </Box>
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
