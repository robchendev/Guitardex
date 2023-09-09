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
