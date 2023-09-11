import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const PlayPauseButton = ({ onClick, isPlaying }: { onClick: () => void; isPlaying: boolean }) => {
  return (
    <button
      className="px-3 py-2 h-10 border-2 border-grey bg-bg2 rounded-md text-text"
      onClick={onClick}
    >
      {isPlaying ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default PlayPauseButton;
