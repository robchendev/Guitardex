import React from "react";
import dynamic from "next/dynamic";
export const LiteYoutubeEmbed = dynamic<ILiteYouTubeEmbedProps>(
  () => import("react-lite-yt-embed").then((module) => module.LiteYoutubeEmbed),
  {
    ssr: false,
  }
);

export interface ILiteYouTubeEmbedProps {
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

const YoutubePlayer = ({ videoId }: { videoId: string }) => {
  return (
    <div className="w-full [&>div]:rounded-lg">
      <LiteYoutubeEmbed
        id={videoId}
        isMobile={true}
        mute={false}
        desktopResolution="maxresdefault"
        mobileResolution="maxresdefault"
        params={{ rel: "0" }}
      />
    </div>
  );
};

export default YoutubePlayer;
