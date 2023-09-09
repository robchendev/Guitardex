import { debounce } from "lodash";
import {
  attemptStop,
  createAndStartBufferSource,
  drawCanvas,
  stopAndDisconnectSource,
} from "./common";

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

export const resizeCanvas = (
  canvasRefBefore: React.RefObject<HTMLCanvasElement>,
  canvasRefAfter: React.RefObject<HTMLCanvasElement>,
  bufferBefore: AudioBuffer | null,
  bufferAfter: AudioBuffer | null
) => {
  [canvasRefBefore.current, canvasRefAfter.current].forEach((canvas) => {
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
  bufferBefore: AudioBuffer | null,
  bufferAfter: AudioBuffer | null
) => {
  const debouncedResizeCanvas = debounce(
    () => resizeCanvas(canvasRefBefore, canvasRefAfter, bufferBefore, bufferAfter),
    500
  );
  window.addEventListener("resize", debouncedResizeCanvas);
  resizeCanvas(canvasRefBefore, canvasRefAfter, bufferBefore, bufferAfter); // initial sizing
  return () => {
    window.removeEventListener("resize", debouncedResizeCanvas);
  };
};
