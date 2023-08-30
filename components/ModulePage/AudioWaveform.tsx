import React, { useEffect, useRef, useState } from "react";

type Props = {
  src?: string;
  isStereo?: boolean;
};

// Keep in mind isStereo will be twice as much workload for the CPU
const AudioWaveform: React.FC<Props> = ({ src = "", isStereo = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Seek audio playing position on waveform click
  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!audioElement || !audioBuffer) return;

    // Get click position within the canvas
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    // Calculate the new time for the audio element
    const newTime = (x / rect.width) * audioBuffer.duration;

    // Update the audio element
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
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

  // Draw the waveform and highlight the current time position
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !audioBuffer) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Your previous code for drawing the waveform
    // Clear the canvas
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
    // Highlight the current time position on the canvas
    const position = (currentTime / audioBuffer.duration) * canvas.width;
    ctx.fillStyle = "red";
    ctx.fillRect(position, 0, 2, canvas.height);
  }, [audioBuffer, currentTime]);

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
      <canvas ref={canvasRef} width={740} height={200} onClick={onCanvasClick}></canvas>
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
        </div>
      )}
    </div>
  );
};

export default AudioWaveform;
