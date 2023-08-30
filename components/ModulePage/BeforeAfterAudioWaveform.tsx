import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

type Props = {
  srcBefore?: string;
  srcAfter?: string;
  defaultVolume?: number;
  isStereo?: boolean;
};

// Keep in mind isStereo will be twice as much workload for the CPU
const AudioWaveform: React.FC<Props> = ({
  srcBefore = "",
  srcAfter = "",
  defaultVolume = 0.5,
  isStereo = false,
}) => {
  const canvasRefBefore = useRef(null);
  const canvasRefAfter = useRef(null);
  const lineCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [audioBufferBefore, setAudioBufferBefore] = useState(null);
  const [audioBufferAfter, setAudioBufferAfter] = useState(null);
  const [audioElementBefore, setAudioElementBefore] = useState(null);
  const [audioElementAfter, setAudioElementAfter] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(defaultVolume);
  const [isAfter, setIsAfter] = useState(false);
  const [currentAudioElement, setCurrentAudioElement] = useState<HTMLAudioElement | null>(null);
  const [currentAudioBuffer, setCurrentAudioBuffer] = useState<AudioBuffer | null>(null);

  // Resize canvases for responsiveness
  const resizeCanvas = () => {
    [canvasRefBefore.current, canvasRefAfter.current, lineCanvasRef.current].forEach((canvas) => {
      if (canvas) {
        // eslint-disable-next-line
        const parentWidth = canvas.parentElement?.offsetWidth!;
        canvas.width = parentWidth;
        canvas.height = parentWidth / 2;
        // You may also want to redraw the canvas after resizing
        if (canvas === canvasRefBefore.current) {
          drawCanvas(canvasRefBefore, audioBufferBefore);
        }
        if (canvas === canvasRefAfter.current) {
          drawCanvas(canvasRefAfter, audioBufferAfter);
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
  }, [audioBufferBefore, audioBufferAfter]);

  // Fetch and decode both audio files
  useEffect(() => {
    const fetchData = async (src, setAudioBuffer, setAudioElement) => {
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const audio = new Audio(src);

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      setAudioBuffer(audioBuffer);
      setAudioElement(audio);
    };

    fetchData(srcBefore, setAudioBufferBefore, setAudioElementBefore);
    fetchData(srcAfter, setAudioBufferAfter, setAudioElementAfter);
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (audioElementBefore) audioElementBefore.volume = volume;
    // @ts-ignore
    if (audioElementAfter) audioElementAfter.volume = volume;
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
    drawCanvas(canvasRefBefore, audioBufferBefore);
    drawCanvas(canvasRefAfter, audioBufferAfter);
    //... existing drawing code
  }, [audioBufferBefore, audioBufferAfter]);

  // UseEffect to update the red line when the currentTime changes
  // const currentAudioBuffer = isAfter ? audioBufferAfter : audioBufferBefore;
  useEffect(() => {
    const lineCanvas = lineCanvasRef.current;
    const lineCtx = lineCanvas?.getContext("2d");

    if (!currentAudioBuffer || !lineCanvas || !lineCtx) return;

    lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
    const position =
      (currentTime / (currentAudioBuffer as AudioBuffer).duration) * lineCanvas.width;
    lineCtx.fillStyle = "red";
    lineCtx.fillRect(position, 0, 2, lineCanvas.height);
  }, [currentTime, currentAudioBuffer]);

  // Animated smooth playback cursor

  const animationFrameRef = useRef<number | null>(null);

  const updateCurrentTime = () => {
    if (currentAudioElement !== null) {
      setCurrentTime((currentAudioElement as HTMLAudioElement).currentTime);
    }

    animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
  };

  useEffect(() => {
    if (currentAudioElement) {
      currentAudioElement.addEventListener("play", () => {
        animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
      });
      currentAudioElement.addEventListener("pause", () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      });
      currentAudioElement.addEventListener("ended", () => {
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
  }, [currentAudioElement]);

  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    let wasPlaying = shouldPlay;

    if (currentAudioElement) {
      wasPlaying = !currentAudioElement.paused;
      currentAudioElement.pause();
    }

    const newAudioElement = isAfter ? audioElementAfter : audioElementBefore;
    const newAudioBuffer = isAfter ? audioBufferAfter : audioBufferBefore;

    setCurrentAudioElement(newAudioElement);
    setCurrentAudioBuffer(newAudioBuffer);

    if (newAudioElement && wasPlaying) {
      (newAudioElement as HTMLAudioElement).currentTime = currentTime;
      (newAudioElement as HTMLAudioElement).play();
      setShouldPlay(true);
    }
  }, [isAfter, audioElementBefore, audioElementAfter, audioBufferBefore, audioBufferAfter]);
  // update audio controls
  // Current Audio element and canvas
  // const currentAudioElement: HTMLAudioElement | null = isAfter
  //   ? audioElementAfter
  //   : audioElementBefore;
  const currentCanvasRef = isAfter ? canvasRefAfter : canvasRefBefore;

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log("Current audio element:", currentAudioElement); // Debug line
    if (!currentAudioElement || !currentCanvasRef.current) return;

    const canvas = currentCanvasRef.current as HTMLCanvasElement;
    const audio = currentAudioElement as HTMLAudioElement;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedTime = (x / rect.width) * audio.duration;
    audio.currentTime = clickedTime;
  };

  // useEffect(() => {
  //   setCurrentAudioElement(isAfter ? audioElementAfter : audioElementBefore);
  //   setCurrentAudioBuffer(isAfter ? audioBufferAfter : audioBufferBefore);
  // }, [isAfter, audioElementBefore, audioElementAfter, audioBufferBefore, audioBufferAfter]);

  return (
    <div>
      <div className="relative w-full">
        <canvas
          ref={canvasRefBefore}
          onClick={onCanvasClick}
          style={{ display: isAfter ? "none" : "block" }}
        ></canvas>
        <canvas
          ref={canvasRefAfter}
          onClick={onCanvasClick}
          style={{ display: isAfter ? "block" : "none" }}
        ></canvas>
        <canvas
          ref={lineCanvasRef}
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        ></canvas>
      </div>
      {currentAudioElement && (
        <div>
          <button onClick={() => setIsAfter(!isAfter)}>
            {isAfter ? "Bypass OFF" : "Bypass ON"}
          </button>
          <button
            onClick={() => {
              if (currentAudioElement) {
                currentAudioElement.play();
                setShouldPlay(true);
              }
            }}
          >
            Play
          </button>
          <button
            onClick={() => {
              if (currentAudioElement) {
                currentAudioElement.pause();
                setShouldPlay(false);
              }
            }}
          >
            Pause
          </button>
          <button
            onClick={() => {
              if (currentAudioElement) {
                const audio = currentAudioElement as HTMLAudioElement;
                audio.pause();
                audio.currentTime = 0;
              }
            }}
          >
            Stop
          </button>
          <label htmlFor="volume">Volume:</label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default AudioWaveform;
