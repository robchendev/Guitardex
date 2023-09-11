import React, { useEffect, useRef } from "react";

type Props = {
  audioContext: AudioContext;
  source: AudioBufferSourceNode;
  gain: GainNode;
};

const AudioMeter: React.FC<Props> = ({ audioContext, source, gain }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // TODO: Make sure to add cleanup!
  useEffect(() => {
    if (!canvasRef.current) return;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    // Chain the nodes
    source.connect(gain).connect(analyser);

    const bufferLength = analyser.fftSize;
    const dataArray = new Float32Array(bufferLength);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getFloatTimeDomainData(dataArray);

      let peak = 0.0;
      for (let i = 0; i < dataArray.length; ++i) {
        peak = Math.max(peak, Math.abs(dataArray[i]));
      }
      const db = 20 * Math.log10(peak);

      // eslint-disable-next-line
      const height = canvas.height;
      const width = canvas.width;
      const x = (Math.max(0, db + 60) / 60) * width;

      // Draw background zones
      ctx.fillStyle = "#427018";
      ctx.fillRect(0, 0, ((-20 + 60) / 60) * width, height);
      ctx.fillStyle = "#705b1c";
      ctx.fillRect(((-20 + 60) / 60) * width, 0, ((-9 + 20) / 60) * width, height);
      ctx.fillStyle = "#702735";
      ctx.fillRect(((-9 + 60) / 60) * width, 0, ((0 + 9) / 60) * width, height);

      // Draw peak level rectangles with darker shades
      const greenZone = Math.min(x, ((-20 + 60) / 60) * width);
      const yellowZone = Math.min(x - greenZone, ((-9 + 20) / 60) * width);
      const redZone = x - greenZone - yellowZone;

      ctx.fillStyle = "#73bd32";
      ctx.fillRect(0, 0, greenZone, height);

      ctx.fillStyle = "#bd900b";
      ctx.fillRect(greenZone, 0, yellowZone, height);

      ctx.fillStyle = "#bd2e4a";
      ctx.fillRect(greenZone + yellowZone, 0, redZone, height);

      // Draw text
      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.fillText("0", width - 10, height / 2);
      ctx.fillText("-20", ((-20 + 60) / 60) * width + 5, height / 2);
      ctx.fillText("-60", 10, height / 2);

      // TODO: Smoothing using EMA
    };

    draw();
  }, [audioContext, source, gain]);

  return (
    <div>
      <canvas ref={canvasRef} width={300} height={30}></canvas>
    </div>
  );
};

export default AudioMeter;
