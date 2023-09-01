import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useRouter } from "next/router";

type Props = {
  srcBefore?: string;
  srcAfter?: string;
  defaultVolume?: number;
};

const BeforeAfterAudioWaveform2 = ({ srcBefore = "", srcAfter = "", defaultVolume = 0.5 }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNodeBefore, setGainNodeBefore] = useState<GainNode | null>(null);
  const [gainNodeAfter, setGainNodeAfter] = useState<GainNode | null>(null);
  const [sourceBefore, setSourceBefore] = useState<AudioBufferSourceNode | null>(null);
  const [sourceAfter, setSourceAfter] = useState<AudioBufferSourceNode | null>(null);
  const [isBefore, setIsBefore] = useState(true);
  const [currentAudioBuffer, setCurrentAudioBuffer] = useState<AudioBuffer | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const canvasRefBefore = useRef<HTMLCanvasElement>(null);
  const canvasRefAfter = useRef<HTMLCanvasElement>(null);
  const lineCanvasRef = useRef<HTMLCanvasElement>(null);
  const [bufferBefore, setBufferBefore] = useState<AudioBuffer | null>(null);
  const [bufferAfter, setBufferAfter] = useState<AudioBuffer | null>(null);
  const [isManualSeek, setIsManualSeek] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchAudioBuffer = async (audioContext, url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  };

  useEffect(() => {
    const ac = new AudioContext();
    if (ac?.state === "running") {
      ac?.suspend();
    }
    setAudioContext(ac);
    Promise.all([fetchAudioBuffer(ac, srcBefore), fetchAudioBuffer(ac, srcAfter)]).then(
      ([fetchedBufferBefore, fetchedBufferAfter]) => {
        setBufferBefore(fetchedBufferBefore);
        setBufferAfter(fetchedBufferAfter);

        const gainBefore = ac.createGain();
        const sourceBefore = ac.createBufferSource();
        sourceBefore.buffer = bufferBefore;
        sourceBefore.loop = true;
        sourceBefore.connect(gainBefore).connect(ac.destination);

        const gainAfter = ac.createGain();
        const sourceAfter = ac.createBufferSource();
        sourceAfter.buffer = bufferAfter;
        sourceAfter.loop = true;
        sourceAfter.connect(gainAfter).connect(ac.destination);

        gainBefore.gain.setValueAtTime(volume, ac.currentTime);
        gainAfter.gain.setValueAtTime(0, ac.currentTime);

        // sourceBefore.start();
        // sourceAfter.start();

        setGainNodeBefore(gainBefore);
        setGainNodeAfter(gainAfter);
        setSourceBefore(sourceBefore);
        setSourceAfter(sourceAfter);

        console.log("source after buffer in init useEffect", sourceAfter.buffer);
      }
    );

    // cleanup
    return () => {
      console.log("Navigating away from page", sourceBefore, sourceAfter, audioContext, ac);
      stopAndDisconnectSource(sourceBefore);
      stopAndDisconnectSource(sourceAfter);
      if (ac) {
        ac.close();
      }
    };
  }, []);

  const createAndStartBufferSource = (audioContext, buffer, gainNode, currentTime) => {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gainNode).connect(audioContext.destination);
    console.log("createAndStartBufferSource, isPlaying: ", isPlaying);
    source.start(0, currentTime % buffer.duration);
    return source;
  };

  const stopAndDisconnectSource = (source) => {
    // DO NOT PUT A isPlaying check here! It doesn't update immediately and can cause audio quality problems!
    console.log("trying to disconnect source, ", source);
    try {
      if (source) {
        source.stop();
        source.disconnect();
      }
    } catch (e) {
      console.error("source hasn't started yet!");
    }
  };

  const switchAudio = () => {
    if (!audioContext || !bufferBefore || !bufferAfter || !gainNodeBefore || !gainNodeAfter) {
      return;
    }

    let newSource;
    if (isBefore) {
      stopAndDisconnectSource(sourceBefore);

      newSource = createAndStartBufferSource(audioContext, bufferAfter, gainNodeAfter, currentTime);

      gainNodeBefore.gain.setValueAtTime(0, audioContext.currentTime);
      gainNodeAfter.gain.setValueAtTime(volume, audioContext.currentTime);

      setSourceAfter(newSource);
    } else {
      stopAndDisconnectSource(sourceAfter);

      newSource = createAndStartBufferSource(
        audioContext,
        bufferBefore,
        gainNodeBefore,
        currentTime
      );

      gainNodeBefore.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNodeAfter.gain.setValueAtTime(0, audioContext.currentTime);

      setSourceBefore(newSource);
    }

    setIsBefore(!isBefore);

    // Update startTime when we switch the audio source
    if (audioContext) {
      startTime.current = audioContext.currentTime - currentTime;
    }
  };

  const resizeCanvas = () => {
    [canvasRefBefore.current, canvasRefAfter.current, lineCanvasRef.current].forEach((canvas) => {
      if (canvas) {
        // eslint-disable-next-line
        const parentWidth = canvas.parentElement?.offsetWidth!;
        canvas.width = parentWidth;
        canvas.height = parentWidth / 2;
        if (canvas === canvasRefBefore.current) {
          drawCanvas(canvasRefBefore, bufferBefore);
        }
        if (canvas === canvasRefAfter.current) {
          drawCanvas(canvasRefAfter, bufferAfter);
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
  }, [bufferBefore, bufferAfter]);

  const drawCanvas = (canvasRef, audioBuffer) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!audioBuffer || !canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "gray";

    if (audioBuffer.numberOfChannels > 1) {
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

  const drawCursor = () => {
    const lineCanvas = lineCanvasRef.current;
    const lineCtx = lineCanvas?.getContext("2d");

    if (!currentAudioBuffer || !lineCanvas || !lineCtx) return;

    lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
    const position =
      (currentTime / (currentAudioBuffer as AudioBuffer).duration) * lineCanvas.width;
    lineCtx.fillStyle = "red";
    lineCtx.fillRect(position, 0, 2, lineCanvas.height);
    // console.log("Drawing cursor at time:", currentTime);
  };

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsManualSeek(true);
    if (!audioContext || !gainNodeBefore || !gainNodeAfter) return;

    const canvas = isBefore ? canvasRefBefore.current : canvasRefAfter.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let clickedTime;

    console.log(sourceBefore, sourceAfter);

    if (isBefore) {
      console.log("isbefore");
      if (bufferBefore) {
        clickedTime = (x / rect.width) * bufferBefore.duration;
      }
      if (sourceBefore && sourceBefore.buffer) {
        sourceBefore.stop();
        const newSourceBefore = audioContext.createBufferSource();
        newSourceBefore.buffer = sourceBefore.buffer;
        newSourceBefore.loop = true;
        newSourceBefore.connect(gainNodeBefore).connect(audioContext.destination);
        newSourceBefore.start(0, clickedTime % sourceBefore.buffer.duration);
        setSourceBefore(newSourceBefore);
      }
    } else if (!isBefore) {
      console.log("isafter");
      if (bufferAfter) {
        clickedTime = (x / rect.width) * bufferAfter.duration;
      }
      if (sourceAfter && sourceAfter.buffer) {
        sourceAfter.stop();
        const newSourceAfter = audioContext.createBufferSource();
        newSourceAfter.buffer = sourceAfter.buffer;
        newSourceAfter.loop = true;
        newSourceAfter.connect(gainNodeAfter).connect(audioContext.destination);
        newSourceAfter.start(0, clickedTime % sourceAfter.buffer.duration);
        setSourceAfter(newSourceAfter);
      }
    }

    if (clickedTime !== undefined) {
      console.log("clickedTime", clickedTime);
      setCurrentTime(clickedTime);
      startTime.current = audioContext.currentTime - clickedTime;
    }
    setIsManualSeek(false);
  };

  useEffect(() => {
    setCurrentAudioBuffer(isBefore ? bufferBefore : bufferAfter);
  }, [isBefore, bufferBefore, bufferAfter]);

  useEffect(() => {
    drawCanvas(canvasRefBefore, bufferBefore);
    drawCanvas(canvasRefAfter, bufferAfter);
  }, [bufferBefore, bufferAfter]);

  useEffect(() => {
    // console.log("Current time", currentTime);
    drawCursor();
  }, [currentTime, currentAudioBuffer]);

  const animationFrameRef = useRef<number | null>(null);
  // let startTime = 0; // Initialize this outside useEffect
  const startTime = useRef(0);

  const updateCurrentTime = () => {
    if (audioContext && currentAudioBuffer) {
      const duration = currentAudioBuffer.duration;
      let newTime = audioContext.currentTime - startTime.current;

      // Wrap around if we reached the end of the audio
      if (newTime >= duration) {
        newTime = newTime % duration;
        // Optionally, reset the audio context time and start time to keep them small
        startTime.current = audioContext.currentTime - newTime;
      }

      setCurrentTime(newTime);
    }

    // Cancel any existing animation frame to prevent multiple loops
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Request a new animation frame
    animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
  };

  useEffect(() => {
    console.log("isManualSeek inside useEffect:", isManualSeek);
    if (audioContext && !isManualSeek) {
      // Start the update loop when the audioContext is in "running" state
      if (audioContext.state === "running") {
        console.log("Starting animation frame loop");
        // Cancel any existing animation frame to prevent multiple loops
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        // Request a new animation frame
        animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
      }

      // Stop the update loop when the audioContext is suspended (paused)
      if (audioContext.state === "suspended") {
        console.log("Stopping animation frame loop");
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioContext, audioContext?.state, isManualSeek]);

  useEffect(() => {
    console.log("Audio Context State Changed!", audioContext?.state);
  }, [audioContext?.state]);

  const playAudio = () => {
    console.log("playAudio");
    console.log("audioContext.state", audioContext?.state);
    if (audioContext && audioContext.state === "suspended") {
      setIsPlaying(true);

      audioContext.resume().then(() => {
        // Stop and disconnect any old source to prevent multiple from playing simultaneously
        stopAndDisconnectSource(isBefore ? sourceBefore : sourceAfter);

        // Create and start a new source
        const newSource = createAndStartBufferSource(
          audioContext,
          isBefore ? bufferBefore : bufferAfter,
          isBefore ? gainNodeBefore : gainNodeAfter,
          currentTime
        );

        if (isBefore) {
          setSourceBefore(newSource);
        } else {
          setSourceAfter(newSource);
        }
      });
    }
  };

  const pauseAudio = () => {
    if (audioContext && audioContext.state === "running") {
      setIsPlaying(false);

      audioContext.suspend().then(() => {
        try {
          if (sourceBefore) {
            sourceBefore.stop();
            sourceBefore.disconnect();
          }
          if (sourceAfter) {
            sourceAfter.stop();
            sourceAfter.disconnect();
          }
          console.log("Playback paused successfully");
        } catch (e) {
          console.log("pauseAudio");
        }
      });
    }
  };

  // New function to handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (gainNodeBefore && gainNodeAfter && audioContext) {
      if (isBefore) {
        gainNodeBefore.gain.setValueAtTime(newVolume, audioContext.currentTime);
      } else {
        gainNodeAfter.gain.setValueAtTime(newVolume, audioContext.currentTime);
      }
    }
  };

  return (
    <div>
      <div className="relative w-full">
        <canvas
          ref={canvasRefBefore}
          onClick={onCanvasClick}
          style={{ display: isBefore ? "block" : "none" }}
        ></canvas>
        <canvas
          ref={canvasRefAfter}
          onClick={onCanvasClick}
          style={{ display: isBefore ? "none" : "block" }}
        ></canvas>
        <canvas
          ref={lineCanvasRef}
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        ></canvas>
      </div>
      <button onClick={switchAudio}>Switch Audio</button>
      <button onClick={playAudio}>Play</button>
      <button onClick={pauseAudio}>Pause</button>
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default BeforeAfterAudioWaveform2;
