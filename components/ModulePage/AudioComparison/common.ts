import { debounce } from "lodash";

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export const fetchAudioBuffer = async (audioContext: AudioContext, url: string) => {
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

export const audioContextSuspend = (ac: AudioContext) => {
  if (ac.state === "running") {
    ac.suspend();
  }
};

export const handleVolumeChange = (
  newVolume: number,
  setVolume: (value: number) => void,
  gainNodeBefore: GainNode | null,
  gainNodeAfter: GainNode | null,
  audioContext: AudioContext | null,
  isBefore: boolean
) => {
  setVolume(newVolume);
  if (gainNodeBefore && gainNodeAfter && audioContext) {
    if (isBefore) {
      gainNodeBefore.gain.setValueAtTime(newVolume, audioContext.currentTime);
    } else {
      gainNodeAfter.gain.setValueAtTime(newVolume, audioContext.currentTime);
    }
  } else {
    if (!gainNodeBefore) {
      console.error("gainNodeBefore is null");
    }
    if (!gainNodeAfter) {
      console.error("gainNodeAfter is null");
    }
    if (!audioContext) {
      console.error("audioContext is null");
    }
  }
};

const attemptStop = (source: AudioBufferSourceNode) => {
  try {
    source.stop();
  } catch (e) {
    console.error("Couldn't stop source node because it hadn't been started.");
  }
};

export const stopAndDisconnectSource = (source: AudioBufferSourceNode | null) => {
  try {
    if (source) {
      attemptStop(source);
      source.disconnect();
    }
  } catch (e) {
    console.error("aborting disconnect operation.");
  }
};

const createAndStartBufferSource = (
  audioContext: AudioContext,
  buffer: AudioBuffer | null,
  gainNode: GainNode | null,
  currentTime: number
) => {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect(gainNode as GainNode).connect(audioContext.destination);
  if (audioContext.state === "running") {
    try {
      source.start(0, currentTime % (buffer as AudioBuffer).duration ?? 1);
    } catch (e) {
      console.error("error at createAndStartBufferSource", e);
    }
  }
  return source;
};

export const canvasSeek = (
  e: React.MouseEvent<HTMLCanvasElement>,
  audioContext: AudioContext | null,
  canvasRefBefore: React.RefObject<HTMLCanvasElement>,
  canvasRefAfter: React.RefObject<HTMLCanvasElement>,
  sourceBefore: AudioBufferSourceNode | null,
  sourceAfter: AudioBufferSourceNode | null,
  bufferBefore: AudioBuffer | null,
  bufferAfter: AudioBuffer | null,
  gainNodeBefore: GainNode | null,
  gainNodeAfter: GainNode | null,
  setSourceBefore: (value: AudioBufferSourceNode | null) => void,
  setSourceAfter: (value: AudioBufferSourceNode | null) => void,
  setIsManualSeek: (value: boolean) => void,
  setCurrentTime: (value: number) => void,
  startTime: React.MutableRefObject<number>,
  isBefore: boolean
) => {
  setIsManualSeek(true);
  if (!audioContext || !gainNodeBefore || !gainNodeAfter) return;
  const canvas = isBefore ? canvasRefBefore.current : canvasRefAfter.current;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  let clickedTime: number | undefined;

  if (isBefore) {
    if (bufferBefore) {
      clickedTime = (x / rect.width) * bufferBefore.duration;
    }
    if (sourceBefore && sourceBefore.buffer) {
      const newSourceBefore = audioContext.createBufferSource();
      newSourceBefore.buffer = sourceBefore.buffer;
      newSourceBefore.loop = true;
      newSourceBefore.connect(gainNodeBefore).connect(audioContext.destination);
      if (audioContext.state === "running" && clickedTime) {
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
      if (audioContext.state === "running" && clickedTime) {
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

export const switchAudio = (
  audioContext: AudioContext | null,
  sourceBefore: AudioBufferSourceNode | null,
  sourceAfter: AudioBufferSourceNode | null,
  bufferBefore: AudioBuffer | null,
  bufferAfter: AudioBuffer | null,
  gainNodeBefore: GainNode | null,
  gainNodeAfter: GainNode | null,
  currentTime: number,
  volume: number,
  startTime: React.MutableRefObject<number>,
  setSourceBefore: (value: AudioBufferSourceNode | null) => void,
  setSourceAfter: (value: AudioBufferSourceNode | null) => void,
  setIsBefore: (value: boolean) => void,
  isBefore: boolean
) => {
  if (!audioContext || !bufferBefore || !bufferAfter || !gainNodeBefore || !gainNodeAfter) {
    return;
  }
  let newSource: AudioBufferSourceNode;
  if (isBefore) {
    stopAndDisconnectSource(sourceBefore);
    newSource = createAndStartBufferSource(audioContext, bufferAfter, gainNodeAfter, currentTime);
    gainNodeBefore.gain.setValueAtTime(0, audioContext.currentTime);
    gainNodeAfter.gain.setValueAtTime(volume, audioContext.currentTime);
    setSourceAfter(newSource);
  } else {
    stopAndDisconnectSource(sourceAfter);
    newSource = createAndStartBufferSource(audioContext, bufferBefore, gainNodeBefore, currentTime);
    gainNodeBefore.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNodeAfter.gain.setValueAtTime(0, audioContext.currentTime);
    setSourceBefore(newSource);
  }

  setIsBefore(!isBefore);
  if (audioContext) {
    startTime.current = audioContext.currentTime - currentTime;
  }
};

export const playAudio = (
  audioContext: AudioContext | null,
  setIsPlaying: (value: boolean) => void,
  sourceBefore: AudioBufferSourceNode | null,
  sourceAfter: AudioBufferSourceNode | null,
  bufferBefore: AudioBuffer | null,
  bufferAfter: AudioBuffer | null,
  gainNodeBefore: GainNode | null,
  gainNodeAfter: GainNode | null,
  currentTime: number,
  setSourceBefore: (value: AudioBufferSourceNode | null) => void,
  setSourceAfter: (value: AudioBufferSourceNode | null) => void,
  isBefore: boolean
) => {
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

export const pauseAudio = (
  audioContext: AudioContext | null,
  setIsPlaying: (value: boolean) => void,
  sourceBefore: AudioBufferSourceNode | null,
  sourceAfter: AudioBufferSourceNode | null
) => {
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

export const updateCurrentTime = (
  audioContext: AudioContext,
  currentAudioBuffer: AudioBuffer | null,
  startTime: React.MutableRefObject<number>,
  animationFrameRef: React.MutableRefObject<number | null>,
  setCurrentTime: (value: number) => void
) => {
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
  animationFrameRef.current = requestAnimationFrame(() =>
    updateCurrentTime(
      audioContext,
      currentAudioBuffer,
      startTime,
      animationFrameRef,
      setCurrentTime
    )
  );
};

export const animationSafeguard = (
  audioContext: AudioContext | null,
  isManualSeek: boolean,
  animationFrameRef: React.MutableRefObject<number | null>,
  currentAudioBuffer: AudioBuffer | null,
  startTime: React.MutableRefObject<number>,
  setCurrentTime: (value: number) => void
) => {
  if (audioContext && !isManualSeek) {
    if (audioContext.state === "running") {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(() =>
        updateCurrentTime(
          audioContext,
          currentAudioBuffer,
          startTime,
          animationFrameRef,
          setCurrentTime
        )
      );
    }
    if (audioContext.state === "suspended") {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }
};

export const animationStop = (animationFrameRef: React.MutableRefObject<number | null>) => {
  if (animationFrameRef.current) {
    cancelAnimationFrame(animationFrameRef.current);
  }
};

export const isSilent = (data, startIndex, endIndex, threshold = 0.01) => {
  for (let i = startIndex; i < endIndex; i++) {
    if (Math.abs(data[i]) > threshold) {
      return false;
    }
  }
  return true;
};

export const drawCursor = (
  currentAudioBuffer: AudioBuffer | null,
  playerRef: React.RefObject<HTMLDivElement>,
  currentTime: number,
  setCursorPosition: (value: number) => void
) => {
  if (!currentAudioBuffer) return;
  const container = playerRef.current;
  if (!container) return;
  const containerWidth = container.offsetWidth;
  const position = (currentTime / (currentAudioBuffer as AudioBuffer).duration) * containerWidth;
  setCursorPosition(position);
};

export const drawCanvas = async (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  audioBuffer: AudioBuffer | null
) => {
  if (!audioBuffer) return;
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Show a loading state
  ctx.fillStyle = "#6b7280";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "60px Fredoka";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Loading...", canvas.width / 2, canvas.height / 2);
  await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#7C3AED";
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

        ctx.fillStyle = "#7C3AED";
        if (isSilent(data, i * step, (i + 1) * step)) {
          ctx.fillRect(i, offset - 1, 1, 2); // Draw 2px line for silence
        } else {
          ctx.fillRect(i, offset - max * amp, 1, (max - min) * amp);
        }
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

      ctx.fillStyle = "#7C3AED";
      if (isSilent(data, i * step, (i + 1) * step)) {
        ctx.fillRect(i, amp - 1, 1, 2); // Draw 2px line for silence
      } else {
        ctx.fillRect(i, amp - max * amp, 1, (max - min) * amp);
      }
    }
  }
  // Remove the loading state by clearing the canvas again
};

export const resizeCanvas = (
  canvasRefBefore: React.RefObject<HTMLCanvasElement>,
  canvasRefAfter: React.RefObject<HTMLCanvasElement>,
  lineCanvasRef: React.RefObject<HTMLCanvasElement>,
  bufferBefore: AudioBuffer | null,
  bufferAfter: AudioBuffer | null
) => {
  [canvasRefBefore.current, canvasRefAfter.current, lineCanvasRef.current].forEach((canvas) => {
    if (canvas) {
      // eslint-disable-next-line
      const parentWidth = canvas.parentElement?.offsetWidth!;
      canvas.width = parentWidth * window.devicePixelRatio;
      canvas.height = (parentWidth / 2.5) * window.devicePixelRatio;
      if (canvas === canvasRefBefore.current) {
        drawCanvas(canvasRefBefore, bufferBefore);
      }
      if (canvas === canvasRefAfter.current) {
        drawCanvas(canvasRefAfter, bufferAfter);
      }
    }
  });
};

export const listenAndResize = (
  canvasRefBefore: React.RefObject<HTMLCanvasElement>,
  canvasRefAfter: React.RefObject<HTMLCanvasElement>,
  lineCanvasRef: React.RefObject<HTMLCanvasElement>,
  bufferBefore: AudioBuffer | null,
  bufferAfter: AudioBuffer | null
) => {
  const debouncedResizeCanvas = debounce(
    () => resizeCanvas(canvasRefBefore, canvasRefAfter, lineCanvasRef, bufferBefore, bufferAfter),
    500
  );
  window.addEventListener("resize", debouncedResizeCanvas);
  resizeCanvas(canvasRefBefore, canvasRefAfter, lineCanvasRef, bufferBefore, bufferAfter); // initial sizing
  return () => {
    window.removeEventListener("resize", debouncedResizeCanvas);
  };
};
