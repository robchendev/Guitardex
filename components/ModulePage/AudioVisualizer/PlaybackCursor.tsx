import React from "react";

const PlaybackCursor = ({ cursorPosition }: { cursorPosition: number }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: `${cursorPosition}px`,
        width: "3px",
        height: "100%",
        border: "1px solid black",
        backgroundColor: "#e7edf3",
        display: cursorPosition !== 0 ? "block" : "none",
      }}
    />
  );
};

export default PlaybackCursor;
