import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

type Props = {
  src?: string;
  defaultVolume?: number;
  isStereo?: boolean;
};

// Keep in mind isStereo will be twice as much workload for the CPU
const AudioWaveform: React.FC<Props> = ({ src = "", defaultVolume = 0.5, isStereo = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lineCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(defaultVolume);

  // Resize canvases for responsiveness
  const resizeCanvas = () => {
    [canvasRef.current, lineCanvasRef.current].forEach((canvas) => {
      if (canvas) {
        // eslint-disable-next-line
        const parentWidth = canvas.parentElement?.offsetWidth!;
        canvas.width = parentWidth;
        canvas.height = parentWidth / 2;
        // You may also want to redraw the canvas after resizing
        if (canvas === canvasRef.current) {
          drawCanvas(canvasRef, audioBuffer);
        }
        if (canvas === lineCanvasRef.current) {
          // Redraw the line, if applicable
        }
      }
    });
  };
  const debouncedResizeCanvas = debounce(resizeCanvas, 500);

  // Listen to window resize
  useEffect(() => {
    window.addEventListener("resize", debouncedResizeCanvas);
    resizeCanvas(); // initial sizing

    return () => {
      window.removeEventListener("resize", debouncedResizeCanvas);
    };
  }, [audioBuffer]);

  // Seek audio playing position on waveform click
  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!audioBuffer || !audioElement) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedTime = (x / e.currentTarget.width) * audioBuffer.duration;

    audioElement.currentTime = clickedTime;
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the audio file
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();

      // Initialize audio context and decode audio
      // @ts-ignore https://github.com/microsoft/TypeScript/issues/31686
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Set audioBuffer to state
      setAudioBuffer(audioBuffer);

      // Create an audio element for playback controls
      const audio = new Audio(src);
      setAudioElement(audio);

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (audioElement) {
      audioElement.volume = volume; // Step 3
    }
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Step 2
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const drawCanvas = (canvasRef, audioBuffer) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!audioBuffer || !canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "gray";

    if (isStereo && audioBuffer.numberOfChannels > 1) {
      // Draw stereo waveforms

      const dataL = audioBuffer.getChannelData(0);
      const dataR = audioBuffer.getChannelData(1);
      const step = Math.ceil(dataL.length / canvas.width);
      const amp = canvas.height / 4; // Reduce amplitude to half to fit both channels

      [dataL, dataR].forEach((data, index) => {
        const offset = index === 0 ? amp : amp * 3;
        for (let i = 0; i < canvas.width; i++) {
          const min = Math.min(...data.slice(i * step, (i + 1) * step));
          const max = Math.max(...data.slice(i * step, (i + 1) * step));
          ctx.fillRect(i, offset - max * amp, 1, (max - min) * amp);
        }
      });
    } else {
      // Draw mono waveform
      const data = audioBuffer.getChannelData(0);
      const step = Math.ceil(data.length / canvas.width);
      const amp = canvas.height / 2;
      for (let i = 0; i < canvas.width; i++) {
        const min = Math.min(...data.slice(i * step, (i + 1) * step));
        const max = Math.max(...data.slice(i * step, (i + 1) * step));
        ctx.fillRect(i, amp - max * amp, 1, Math.max(1, (max - min) * amp));
      }
    }
  };

  // The useEffects for the waveform drawing and red cursor are separated
  // to save on CPU workload

  // UseEffect to draw the waveform ONCE when the audioBuffer changes
  useEffect(() => {
    // When the canvas size changes, re-draw your canvas here.
    // You'll need to re-draw whenever `resizeCanvas` changes the dimensions.
    // This is where you'll call your drawCanvas function.
    drawCanvas(canvasRef, audioBuffer);
    //... existing drawing code
  }, [audioBuffer]);

  // UseEffect to update the red line when the currentTime changes
  useEffect(() => {
    const lineCanvas = lineCanvasRef.current;
    const lineCtx = lineCanvas?.getContext("2d");

    if (!audioBuffer || !lineCanvas || !lineCtx) return;

    lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
    const position = (currentTime / audioBuffer.duration) * lineCanvas.width;
    lineCtx.fillStyle = "red";
    lineCtx.fillRect(position, 0, 2, lineCanvas.height);
  }, [currentTime]);

  // Animated smooth playback cursor

  const animationFrameRef = useRef<number | null>(null);

  const updateCurrentTime = () => {
    if (audioElement) {
      setCurrentTime(audioElement.currentTime);
    }
    animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
  };

  useEffect(() => {
    if (audioElement) {
      audioElement.addEventListener("play", () => {
        animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
      });
      audioElement.addEventListener("pause", () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      });
      audioElement.addEventListener("ended", () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      });
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioElement]);

  return (
    <div>
      NEED IMPLEMENTATION AFTER REFACTORING THE COMPARISON
      <div className="relative">
        <canvas ref={canvasRef} width={740} height={200} onClick={onCanvasClick}></canvas>
        <canvas
          ref={lineCanvasRef}
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
          width={700}
          height={200}
        ></canvas>
      </div>
      {audioElement && (
        <div>
          <button onClick={() => audioElement.play()}>Play</button>
          <button onClick={() => audioElement.pause()}>Pause</button>
          <button
            onClick={() => {
              audioElement.pause();
              audioElement.currentTime = 0;
            }}
          >
            Stop
          </button>
          <div>
            <label htmlFor="volume">Volume:</label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange} // Step 2
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioWaveform;
