import { Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { GuitarInfo } from "../config/config";
import dynamic from "next/dynamic";
const LiteYoutubeEmbed = dynamic<ILiteYouTubeEmbedProps>(
  () => import("react-lite-yt-embed").then((module) => module.LiteYoutubeEmbed),
  {
    ssr: false,
  }
);

interface ILiteYouTubeEmbedProps {
  id: string;
  adLinksPreconnect?: boolean;
  defaultPlay?: boolean;
  isPlaylist?: boolean;
  noCookie?: boolean;
  mute?: boolean;
  params?: Record<string, string>;
  isMobile?: boolean;
  mobileResolution?: "maxresdefault" | "sddefault" | "hqdefault";
  desktopResolution?: "maxresdefault" | "sddefault" | "hqdefault";
  lazyImage?: boolean;
  iframeTitle?: string;
  imageAltText?: string;
}

type ItemComponent = {
  available: "buy" | "discontinued";
  buyLink?: string;
  price?: string;
};

const BuyButton = ({ item }: { item: ItemComponent }) => {
  switch (item.available) {
    case "buy":
      return (
        <a
          href={item.buyLink}
          className="bg-carmine-soft hover:bg-carmine-hard text-lg px-5 py-2 rounded-sm"
        >
          Buy this guitar
        </a>
      );
    case "discontinued":
      return (
        <a href={item.buyLink} className="bg-grey-soft text-lg px-5 py-2 rounded-sm">
          Discontinued
        </a>
      );
  }
};

const GuitarCard = ({ index, guitar }: { index: number; guitar: GuitarInfo }) => {
  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 2, md: 0 }} w="full">
      <div className="w-full lg:w-1/2 [&>div]:rounded-md">
        <LiteYoutubeEmbed
          id={guitar.videoId}
          isMobile={true}
          mute={false}
          desktopResolution="maxresdefault"
          mobileResolution="maxresdefault"
          params={{ rel: "0" }}
        />
      </div>
      <VStack
        className="w-full lg:w-1/2 [&>div]:rounded-md text-left md:text-right"
        alignItems={{ base: "flex-start", md: "flex-end" }}
        justifyContent="space-between"
        spacing={3}
      >
        <div>
          <p className="text-2xl">{guitar.name}</p>
          <p className="text-gold -mb-1">{guitar.brand}</p>
        </div>
        <Text className="lg:pl-10">{guitar.desc}</Text>
        <BuyButton key={index} item={guitar}></BuyButton>
      </VStack>
    </Stack>
  );
};

export default GuitarCard;
