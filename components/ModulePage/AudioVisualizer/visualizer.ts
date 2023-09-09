import { debounce } from "lodash";
import { drawCanvas } from "./common";

export const handleVolumeChange = (
  newVolume: number,
  setVolume: (value: number) => void,
  gainNode: GainNode | null,
  audioContext: AudioContext | null
) => {
  setVolume(newVolume);
  if (gainNode && audioContext) {
    gainNode.gain.setValueAtTime(newVolume, audioContext.currentTime);
  } else {
    if (!gainNode) {
      console.error("gainNodeBefore is null");
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
  canvasRef: React.RefObject<HTMLCanvasElement>,
  source: AudioBufferSourceNode | null,
  buffer: AudioBuffer | null,
  gainNode: GainNode | null,
  setSource: (value: AudioBufferSourceNode | null) => void,
  setIsManualSeek: (value: boolean) => void,
  setCurrentTime: (value: number) => void,
  startTime: React.MutableRefObject<number>
) => {
  setIsManualSeek(true);
  if (!audioContext || !gainNode) return;
  const canvas = canvasRef.current;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  let clickedTime: number | undefined;

  if (buffer) {
    clickedTime = (x / rect.width) * buffer.duration;
  }
  if (source && source.buffer) {
    const newSourceBefore = audioContext.createBufferSource();
    newSourceBefore.buffer = source.buffer;
    newSourceBefore.loop = true;
    newSourceBefore.connect(gainNode).connect(audioContext.destination);
    if (audioContext.state === "running" && clickedTime) {
      newSourceBefore.start(0, clickedTime % source.buffer.duration);
    }
    attemptStop(source);
    setSource(newSourceBefore);
  }

  if (clickedTime !== undefined) {
    setCurrentTime(clickedTime);
    startTime.current = audioContext.currentTime - clickedTime;
  }
  setIsManualSeek(false);
};

export const switchAudio = (
  audioContext: AudioContext | null,
  source: AudioBufferSourceNode | null,
  buffer: AudioBuffer | null,
  gainNode: GainNode | null,
  currentTime: number,
  volume: number,
  startTime: React.MutableRefObject<number>,
  setSource: (value: AudioBufferSourceNode | null) => void
) => {
  if (!audioContext || !buffer || !gainNode) {
    return;
  }
  stopAndDisconnectSource(source);
  const newSource = createAndStartBufferSource(audioContext, buffer, gainNode, currentTime);
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  setSource(newSource);
  if (audioContext) {
    startTime.current = audioContext.currentTime - currentTime;
  }
};

export const playAudio = (
  audioContext: AudioContext | null,
  setIsPlaying: (value: boolean) => void,
  source: AudioBufferSourceNode | null,
  buffer: AudioBuffer | null,
  gainNode: GainNode | null,
  currentTime: number,
  setSource: (value: AudioBufferSourceNode | null) => void
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
      stopAndDisconnectSource(source);
      const newSource = createAndStartBufferSource(audioContext, buffer, gainNode, currentTime);
      setSource(newSource);
    });
  }
};

export const pauseAudio = (
  audioContext: AudioContext | null,
  setIsPlaying: (value: boolean) => void,
  source: AudioBufferSourceNode | null
) => {
  if (audioContext && audioContext.state === "running") {
    audioContext.suspend().then(() => {
      // sometimes onCanvasClick then pauseAudio immediately afterwords can
      // bork the audioContext.state, so use this to keep track of pause/play button
      setIsPlaying(false);
      try {
        if (source) {
          stopAndDisconnectSource(source);
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

export const resizeCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement> | null,
  buffer: AudioBuffer | null
) => {
  if (canvasRef && canvasRef.current) {
    const canvas = canvasRef.current;
    // eslint-disable-next-line
    const parentWidth = canvas.parentElement?.offsetWidth!;
    canvas.width = parentWidth * window.devicePixelRatio;
    canvas.height = (parentWidth / 2.5) * window.devicePixelRatio;
    drawCanvas(canvasRef, buffer);
  }
};

export const listenAndResize = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  buffer: AudioBuffer | null
) => {
  const debouncedResizeCanvas = debounce(() => resizeCanvas(canvasRef, buffer), 500);
  window.addEventListener("resize", debouncedResizeCanvas);
  resizeCanvas(canvasRef, buffer); // initial sizing
  return () => {
    window.removeEventListener("resize", debouncedResizeCanvas);
  };
};
