import { Text } from "@chakra-ui/react";
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
        <span className="inline-block align-middle">
          <span className="w-max text-4xl p-6">${item.price}</span>
          <a href={item.buyLink} className="bg-carmine-soft w-max text-lg px-5 py-2.5 rounded-sm">
            Buy this guitar
          </a>
        </span>
      );
    case "discontinued":
      return (
        <a href={item.buyLink} className="bg-grey-soft w-max text-2xl p-2 rounded-md">
          Discontinued
        </a>
      );
  }
};

const GuitarCard = ({ index, guitar }: { index: number; guitar: GuitarInfo }) => {
  return (
    <div key={index} className="max-w-5xl flex flex-row end text-right my-16 last:mb-0 first:mt-0">
      <div className="w-1/2 [&>div]:rounded-md">
        <LiteYoutubeEmbed
          id={guitar.videoId}
          isMobile={true}
          mute={false}
          desktopResolution="maxresdefault"
          mobileResolution="maxresdefault"
          params={{ rel: "0" }}
        />
      </div>
      <div className="flex flex-col w-1/2 items-end justify-between">
        <div>
          <h2 className="text-4xl">{guitar.name}</h2>
          <span className=" text-gold">{guitar.brand}</span>
        </div>
        <Text className="text-xl pl-10">{guitar.desc}</Text>

        <BuyButton key={index} item={guitar}></BuyButton>
      </div>
    </div>
  );
};

export default GuitarCard;
