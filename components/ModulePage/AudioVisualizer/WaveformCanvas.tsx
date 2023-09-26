import React from "react";

const WaveformCanvas = ({
  canvasRef,
  handleCanvasClick,
  isCurrent = true,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleCanvasClick: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  isCurrent?: boolean;
}) => {
  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{ display: isCurrent ? "block" : "none", width: "100%" }}
      className="focus:outline-none"
      tabIndex={-1}
    ></canvas>
  );
};

export default WaveformCanvas;
