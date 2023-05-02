import { HStack, VStack } from "@chakra-ui/react";
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
        className="absolute top-0 left-0 bg-cover w-full h-full bg-repeat blur-xl brightness-75"
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      />
      <VStack spacing={0} className="relative top-0 w-full h-full">
        <Image width={440} height={440} alt={linkData.title} src={imageSrc} />
        <div style={{ width: 440 }} className=" bg-white-soft pb-2">
          {/* grouped together because it shows the white bg between them */}
          <div className="bg-grey-hard">
            <div className="text-center text-xl w-full pt-5 text-white-ghost">
              {linkData.subtitle}
            </div>
            <div className="text-center text-3xl w-full pt-2 text-white-soft">{linkData.title}</div>
            <div className="text-center text-md w-full pt-3 pb-5 text-white-soft">
              Choose streaming platform
            </div>
          </div>
          <Arrow />
          {linkData.items.map((item: LinkItem, index: number) => (
            <>
              <HStack
                key={index}
                className="text-lg  p-4 first-of-type:pt-2"
                justifyContent="space-between"
              >
                {/* <div>{item.brandLogo}</div> */}
                <DynaImage prop={item.brandLogo} />
                <a
                  className="text-grey-med text-md rounded-md border border-grey-med px-2 py-1 "
                  href={item.buttonLink}
                >
                  {item.buttonLabel}
                </a>
              </HStack>
              <div className="w-full h-px bg-carmine-hard last-of-type:hidden"></div>
            </>
          ))}
        </div>
      </VStack>
    </div>
  );
};

const Arrow = () => {
  {
    /* This is arrow using borders lmfao */
  }
  return (
    <div
      className="w-0 h-0 mx-auto
border-l-[10px] border-l-transparent
border-t-[15px] border-t-grey-hard
border-r-[10px] border-r-transparent
"
    ></div>
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
