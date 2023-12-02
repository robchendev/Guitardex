import React, { useEffect, useRef, useState } from "react";
import Divider from "../../Sidebar/Divider";
// import AudioMeter from "../AudioMeter";
import {
  Stack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  HStack,
} from "@chakra-ui/react";
import VolumeIcon from "./VolumeIcon";
import {
  canvasSeek,
  handleToggleMute,
  handleVolumeChange,
  listenAndResize,
  pauseAudio,
  playAudio,
} from "./visualizer";
import {
  animationSafeguard,
  animationStop,
  audioContextSuspend,
  drawCanvas,
  drawCursor,
  formatTime,
  stopAndDisconnectSource,
} from "./common";
import PlaybackCursor from "./PlaybackCursor";
import WaveformCanvas from "./WaveformCanvas";
import PlayPauseButton from "./PlayPauseButton";
import { getAudioFromCache } from "./audioCache";

type Props = {
  src?: string;
  defaultVolume?: number;
};

const AudioVisualizer = ({ src = "", defaultVolume = 0.5 }: Props) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const [source, setSource] = useState<AudioBufferSourceNode | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);
  const [isManualSeek, setIsManualSeek] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);
  const [cursorPosition, setCursorPosition] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    const ac = new AudioContext();
    setAudioContext(ac);
    audioContextSuspend(ac);
    Promise.all([getAudioFromCache(ac, src)]).then(([cachedBuffer]) => {
      if (isCancelled || ac.state === "closed") return;

      // Setup Before Audio
      const gainCurr = ac.createGain();
      const sourceCurr = ac.createBufferSource();
      sourceCurr.buffer = cachedBuffer;
      sourceCurr.loop = true;
      sourceCurr.connect(gainCurr).connect(ac.destination);
      gainCurr.gain.setValueAtTime(volume, ac.currentTime);
      setBuffer(cachedBuffer);
      setDuration(sourceCurr.buffer?.duration ?? 0);
      setGainNode(gainCurr);
      setSource(sourceCurr);

      audioContextSuspend(ac);
    });
    audioContextSuspend(ac);

    // Cleanup on unmount
    return () => {
      isCancelled = true;
      stopAndDisconnectSource(source);
      if (ac) {
        audioContextSuspend(ac);
        ac.close();
      }
    };
  }, []);

  useEffect(() => {
    listenAndResize(canvasRef, buffer);
    async () => {
      await drawCanvas(canvasRef, buffer);
    };
  }, [buffer]);

  useEffect(() => {
    drawCursor(buffer, playerRef, currentTime, setCursorPosition);
  }, [currentTime]);

  const animationFrameRef = useRef<number | null>(null);
  const startTime = useRef(0);
  useEffect(() => {
    animationSafeguard(
      audioContext,
      isManualSeek,
      animationFrameRef,
      buffer,
      startTime,
      setCurrentTime
    );
    return () => {
      animationStop(animationFrameRef);
    };
  }, [audioContext, audioContext?.state, isManualSeek]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio(audioContext, setIsPlaying, source);
    } else {
      playAudio(audioContext, setIsPlaying, source, buffer, gainNode, currentTime, setSource);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    canvasSeek(
      e,
      audioContext,
      canvasRef,
      source,
      buffer,
      gainNode,
      setSource,
      setIsManualSeek,
      setCurrentTime,
      startTime
    );
  };

  useEffect(() => {
    function handleSpaceDown(event) {
      if (event.code === "Space") {
        event.preventDefault();
      }
    }
    function handleSpaceUp(event) {
      if (event.code === "Space") {
        if (canvasRef.current && canvasRef.current.contains(document.activeElement)) {
          handlePlayPause();
        }
      }
    }
    if (canvasRef.current) {
      canvasRef.current.addEventListener("keydown", handleSpaceDown);
      canvasRef.current.addEventListener("keyup", handleSpaceUp);
    }
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("keydown", handleSpaceDown);
        canvasRef.current.removeEventListener("keyup", handleSpaceUp);
      }
    };
  }, [handlePlayPause, canvasRef]);

  const onMuteToggled = () => {
    setMuted(!muted);
  };

  useEffect(() => {
    handleToggleMute(muted, volume, audioContext, gainNode);
  }, [muted, handleToggleMute]);

  return (
    <div className="rounded-xl border-2 border-bg px-3 py-2 bg-bg mb-4 last:mb-0 group focus-within:border-purple">
      {/* <div className="font-medium">
        Now playing:{" "}
        {isBefore
          ? srcBefore.split("/").pop()?.toUpperCase()
          : srcAfter.split("/").pop()?.toUpperCase()}
        </div> */}
      <div className="relative w-full mb-3" ref={playerRef}>
        <WaveformCanvas canvasRef={canvasRef} handleCanvasClick={handleCanvasClick} />
        <PlaybackCursor cursorPosition={cursorPosition} />
      </div>
      <Divider />
      {/* {sourceBefore && sourceAfter && audioContext && gainNodeBefore && gainNodeAfter && (
          <AudioMeter
            audioContext={audioContext}
            source={isBefore ? sourceBefore : sourceAfter}
            gain={isBefore ? gainNodeBefore : gainNodeAfter}
          />
        )} */}
      <div className="mt-3">
        <Stack direction={{ base: "column", lg: "row" }}>
          <HStack>
            <PlayPauseButton onClick={handlePlayPause} isPlaying={isPlaying} />
            <HStack
              className="text-xl pr-5 h-10 rounded-md bg-bg2 border-grey border-2 w-full lg:w-40"
              spacing={0}
            >
              <VolumeIcon volumeLevel={volume} muted={muted} onClick={onMuteToggled} />
              <div className="w-full py-2">
                <Slider
                  defaultValue={volume}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(value) =>
                    handleVolumeChange(value, setVolume, gainNode, audioContext, muted)
                  }
                  size="lg"
                  paddingLeft={0}
                  marginLeft={0}
                >
                  <SliderTrack>
                    <SliderFilledTrack bgColor="#7c3aed" />
                  </SliderTrack>
                  <SliderThumb bgColor="#7c3aed" />
                </Slider>
              </div>
            </HStack>
          </HStack>
          <div className="flex items-center">
            <HStack spacing={0} justifyContent="center" w="full">
              <div className="w-9">{formatTime(currentTime)}</div>
              <div className="text-center">/</div>
              <div className="w-9 text-right">{formatTime(duration)}</div>
            </HStack>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default AudioVisualizer;
