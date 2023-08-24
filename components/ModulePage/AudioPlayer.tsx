import React from "react";
import { Howl, Howler } from "howler";

const AudioPlayer = ({ src = "" }: { src?: string }) => {
  const sound = new Howl({
    src,
    html5: true,
  });
  const play = () => sound.play();
  const pause = () => sound.pause();
  return (
    <>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </>
  );
};

export default AudioPlayer;
