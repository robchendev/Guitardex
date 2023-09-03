import React, { useEffect, useState } from "react";
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
  const [minHeight, setMinHeight] = useState<number>(420);

  useEffect(() => {
    const container = document.getElementById("youtube-embed-container");
    const width = container?.offsetWidth || 0;
    const minHeight = (width * 9) / 16;

    setMinHeight(Math.round(minHeight));
  }, []);

  return (
    <div
      className="w-full [&>div]:rounded-lg"
      style={{
        minHeight: minHeight > 0 ? `${minHeight}px` : "",
      }}
      id="youtube-embed-container"
    >
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
