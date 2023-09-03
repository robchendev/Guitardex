import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

type Props = {
  srcBefore?: string;
  srcAfter?: string;
  defaultVolume?: number;
};

const BeforeAfterAudioWaveform2 = ({
  srcBefore = "",
  srcAfter = "",
  defaultVolume = 0.5,
}: Props) => {
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
  const [cursorPosition, setCursorPosition] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchAudioBuffer = async (audioContext, url) => {
    const response: Response = await fetch(url);
    const arrayBuffer: ArrayBuffer = await response.arrayBuffer();
    const decodedAudioData = await (audioContext as AudioContext).decodeAudioData(arrayBuffer);
    // Might be a firefox bug, decodeAudioData forces audioContext.state to running.
    // Created a bug report here: https://bugzilla.mozilla.org/show_bug.cgi?id=1851345
    if (audioContext.state === "running") {
      await audioContext.suspend();
    }
    return decodedAudioData;
  };
  useEffect(() => {
    let isCancelled = false; // Cancellation token
    const ac = new AudioContext();
    setAudioContext(ac);
    if (ac.state === "running") {
      ac.suspend();
    }
    Promise.all([fetchAudioBuffer(ac, srcBefore), fetchAudioBuffer(ac, srcAfter)]).then(
      ([fetchedBufferBefore, fetchedBufferAfter]) => {
        if (isCancelled || ac.state === "closed") return;
        setBufferBefore(fetchedBufferBefore);
        setBufferAfter(fetchedBufferAfter);
        const gainBefore = ac.createGain();
        const sourceBefore = ac.createBufferSource();
        sourceBefore.buffer = fetchedBufferBefore;
        sourceBefore.loop = true;
        sourceBefore.connect(gainBefore).connect(ac.destination);
        const gainAfter = ac.createGain();
        const sourceAfter = ac.createBufferSource();
        sourceAfter.buffer = fetchedBufferAfter;
        sourceAfter.loop = true;
        sourceAfter.connect(gainAfter).connect(ac.destination);
        gainBefore.gain.setValueAtTime(volume, ac.currentTime);
        gainAfter.gain.setValueAtTime(0, ac.currentTime);
        setGainNodeBefore(gainBefore);
        setGainNodeAfter(gainAfter);
        setSourceBefore(sourceBefore);
        setSourceAfter(sourceAfter);
        if (ac.state === "running") {
          ac.suspend();
        }
      }
    );
    if (ac.state === "running") {
      ac.suspend();
    }
    // Cleanup
    return () => {
      isCancelled = true;
      stopAndDisconnectSource(sourceBefore);
      stopAndDisconnectSource(sourceAfter);
      if (ac) {
        if (ac.state === "running") {
          ac.suspend();
        }
        ac.close();
      }
    };
  }, []);
  const createAndStartBufferSource = (audioContext, buffer, gainNode, currentTime) => {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gainNode).connect(audioContext.destination);
    if (audioContext.state === "running") {
      try {
        source.start(0, currentTime % buffer.duration);
      } catch (e) {
        console.error("error at createAndStartBufferSource", e);
      }
    }
    return source;
  };
  const stopAndDisconnectSource = (source) => {
    try {
      if (source) {
        attemptStop(source);
        source.disconnect();
      }
    } catch (e) {
      console.error("aborting disconnect operation.");
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
    if (audioContext) {
      startTime.current = audioContext.currentTime - currentTime;
    }
  };
  const resizeCanvas = () => {
    [canvasRefBefore.current, canvasRefAfter.current, lineCanvasRef.current].forEach((canvas) => {
      if (canvas) {
        // eslint-disable-next-line
        const parentWidth = canvas.parentElement?.offsetWidth!;
        canvas.width = parentWidth * window.devicePixelRatio;
        canvas.height = (parentWidth / 2) * window.devicePixelRatio;
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
  useEffect(() => {
    window.addEventListener("resize", debouncedResizeCanvas);
    resizeCanvas(); // initial sizing
    return () => {
      window.removeEventListener("resize", debouncedResizeCanvas);
    };
  }, [bufferBefore, bufferAfter]);

  const drawCanvas = async (canvasRef, audioBuffer) => {
    if (!audioBuffer) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!canvas || !ctx) return;

    // Show a loading state
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "60px Fredoka";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Loading...", canvas.width / 2, canvas.height / 2);
    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "gray";
    if (audioBuffer.numberOfChannels > 1) {
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
    // Remove the loading state by clearing the canvas again
  };

  const attemptStop = (source: AudioBufferSourceNode) => {
    try {
      source.stop();
    } catch (e) {
      console.error("Couldn't stop source node because it hadn't been started.");
    }
  };

  const drawCursor = () => {
    if (!currentAudioBuffer) return;
    const container = playerRef.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const position = (currentTime / (currentAudioBuffer as AudioBuffer).duration) * containerWidth;
    setCursorPosition(position);
  };

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsManualSeek(true);
    if (!audioContext || !gainNodeBefore || !gainNodeAfter) return;
    const canvas = isBefore ? canvasRefBefore.current : canvasRefAfter.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let clickedTime;

    if (isBefore) {
      if (bufferBefore) {
        clickedTime = (x / rect.width) * bufferBefore.duration;
      }
      if (sourceBefore && sourceBefore.buffer) {
        const newSourceBefore = audioContext.createBufferSource();
        newSourceBefore.buffer = sourceBefore.buffer;
        newSourceBefore.loop = true;
        newSourceBefore.connect(gainNodeBefore).connect(audioContext.destination);
        if (audioContext.state === "running") {
          newSourceBefore.start(0, clickedTime % sourceBefore.buffer.duration);
        }
        attemptStop(sourceBefore);
        setSourceBefore(newSourceBefore);
      }
    } else if (!isBefore) {
      if (bufferAfter) {
        clickedTime = (x / rect.width) * bufferAfter.duration;
      }
      if (sourceAfter && sourceAfter.buffer) {
        const newSourceAfter = audioContext.createBufferSource();
        newSourceAfter.buffer = sourceAfter.buffer;
        newSourceAfter.loop = true;
        newSourceAfter.connect(gainNodeAfter).connect(audioContext.destination);
        if (audioContext.state === "running") {
          newSourceAfter.start(0, clickedTime % sourceAfter.buffer.duration);
        }
        attemptStop(sourceAfter);
        setSourceAfter(newSourceAfter);
      }
    }

    if (clickedTime !== undefined) {
      setCurrentTime(clickedTime);
      startTime.current = audioContext.currentTime - clickedTime;
    }
    setIsManualSeek(false);
  };

  useEffect(() => {
    setCurrentAudioBuffer(isBefore ? bufferBefore : bufferAfter);
  }, [isBefore, bufferBefore, bufferAfter]);

  useEffect(() => {
    async () => {
      await drawCanvas(canvasRefBefore, bufferBefore);
      await drawCanvas(canvasRefAfter, bufferAfter);
    };
  }, [bufferBefore, bufferAfter]);

  useEffect(() => {
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
    if (audioContext && !isManualSeek) {
      if (audioContext.state === "running") {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
      }
      if (audioContext.state === "suspended") {
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

  const playAudio = () => {
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        // sometimes onCanvasClick then pauseAudio immediately afterwords can
        // bork the audioContext.state, so use this to keep track of pause/play button
        setIsPlaying(true);
        // Check if device is IOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
          const hasConfirmedAudio = localStorage.getItem("hasConfirmedAudio");
          const confirmedAudioTime = localStorage.getItem("confirmedAudioTime");
          // Check if stored value is expired (3 days)
          const isExpired = confirmedAudioTime
            ? Date.now() - Number(confirmedAudioTime) > 3 * 24 * 60 * 60 * 1000
            : true;
          if (isExpired || !hasConfirmedAudio) {
            const headphoneAlert = window.confirm(
              "iOS devices require Silent Mode to be turned off to play this audio. To circumvent this restriction, you can also wear headphones. Upon clicking 'OK', this popup will not appear for 3 days."
            );
            if (headphoneAlert) {
              localStorage.setItem("hasConfirmedAudio", "true");
              localStorage.setItem("confirmedAudioTime", String(Date.now()));
            }
          }
        }
        stopAndDisconnectSource(isBefore ? sourceBefore : sourceAfter);
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
      audioContext.suspend().then(() => {
        // sometimes onCanvasClick then pauseAudio immediately afterwords can
        // bork the audioContext.state, so use this to keep track of pause/play button
        setIsPlaying(false);
        try {
          if (sourceBefore) {
            stopAndDisconnectSource(sourceBefore);
          }
          if (sourceAfter) {
            stopAndDisconnectSource(sourceAfter);
          }
        } catch (e) {
          console.error(e);
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
      <div className="font-medium">
        Now playing:{" "}
        {isBefore
          ? srcBefore.split("/").pop()?.toUpperCase()
          : srcAfter.split("/").pop()?.toUpperCase()}
      </div>
      <div className="relative w-full" ref={playerRef}>
        <canvas
          ref={canvasRefBefore}
          onClick={onCanvasClick}
          style={{ display: isBefore ? "block" : "none", width: "100%" }}
        ></canvas>
        <canvas
          ref={canvasRefAfter}
          onClick={onCanvasClick}
          style={{ display: isBefore ? "none" : "block", width: "100%" }}
        ></canvas>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${cursorPosition}px`,
            width: "2px",
            height: "100%",
            backgroundColor: "red",
            display: currentTime !== 0 ? "block" : "none",
          }}
        ></div>
      </div>
      <button
        className="px-3 py-2 border border-text rounded-md hover:bg-greyChecked hover:text-white"
        onClick={switchAudio}
      >
        Bypass: {isBefore ? "ON" : "OFF"}
      </button>
      <button
        className="px-3 py-2 border border-text rounded-md hover:bg-greyChecked hover:text-white"
        onClick={isPlaying ? pauseAudio : playAudio}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <span>Volume:</span>
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
