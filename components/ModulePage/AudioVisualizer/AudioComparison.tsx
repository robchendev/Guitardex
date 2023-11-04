import React, { useCallback, useEffect, useRef, useState } from "react";
import Divider from "../../Sidebar/Divider";
// import AudioMeter from "../AudioMeter";
import {
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
} from "@chakra-ui/react";
import VolumeIcon from "./VolumeIcon";
import {
  canvasSeek,
  handleVolumeChange,
  listenAndResize,
  pauseAudio,
  playAudio,
  switchAudio,
  handleToggleMute,
} from "./comparison";
import {
  animationSafeguard,
  animationStop,
  audioContextSuspend,
  drawCanvas,
  drawCursor,
  formatTime,
  stopAndDisconnectSource,
} from "./common";
import WaveformCanvas from "./WaveformCanvas";
import PlaybackCursor from "./PlaybackCursor";
import BypassNotice from "./BypassNotice";
import ToggleFX from "./ToggleFX";
import PlayPauseButton from "./PlayPauseButton";
import AudioMeter from "../AudioMeter";
import { getAudioFromCache } from "./audioCache";
import IncompatibilityNotice from "./IncompatibilityNotice";

type Props = {
  srcBefore?: string;
  srcAfter?: string;
  defaultVolume?: number;
  defaultTrack?: "before" | "after";
};

// Assumes both audio files are the same length
const AudioComparison = ({
  srcBefore = "",
  srcAfter = "",
  defaultVolume = 0.5,
  defaultTrack = "before",
}: Props) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNodeBefore, setGainNodeBefore] = useState<GainNode | null>(null);
  const [gainNodeAfter, setGainNodeAfter] = useState<GainNode | null>(null);
  const [sourceBefore, setSourceBefore] = useState<AudioBufferSourceNode | null>(null);
  const [sourceAfter, setSourceAfter] = useState<AudioBufferSourceNode | null>(null);
  const [isBefore, setIsBefore] = useState(defaultTrack === "before" ? true : false);
  const [currentAudioBuffer, setCurrentAudioBuffer] = useState<AudioBuffer | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const canvasRefBefore = useRef<HTMLCanvasElement>(null);
  const canvasRefAfter = useRef<HTMLCanvasElement>(null);
  const [bufferBefore, setBufferBefore] = useState<AudioBuffer | null>(null);
  const [bufferAfter, setBufferAfter] = useState<AudioBuffer | null>(null);
  const [isManualSeek, setIsManualSeek] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);
  // used to save the last volume value before muting
  const [previousVolume, setPreviousVolume] = useState(defaultVolume);
  const [cursorPosition, setCursorPosition] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationBefore, setDurationBefore] = useState(0);
  const [durationAfter, setDurationAfter] = useState(0);
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    const ac = new AudioContext();
    setAudioContext(ac);
    audioContextSuspend(ac);

    Promise.all([getAudioFromCache(ac, srcBefore), getAudioFromCache(ac, srcAfter)])
      .then(([cachedBufferBefore, cachedBufferAfter]) => {
        if (isCancelled || ac.state === "closed") return;

        // Setup Before Audio
        const gainBefore = ac.createGain();
        const sourceBefore = ac.createBufferSource();
        sourceBefore.buffer = cachedBufferBefore;
        sourceBefore.loop = true;
        sourceBefore.connect(gainBefore).connect(ac.destination);
        gainBefore.gain.setValueAtTime(volume, ac.currentTime);
        setBufferBefore(cachedBufferBefore);
        setDurationBefore(sourceBefore.buffer?.duration ?? 0);
        setGainNodeBefore(gainBefore);
        setSourceBefore(sourceBefore);

        // Setup After Audio
        const gainAfter = ac.createGain();
        const sourceAfter = ac.createBufferSource();
        sourceAfter.buffer = cachedBufferAfter;
        sourceAfter.loop = true;
        sourceAfter.connect(gainAfter).connect(ac.destination);
        gainAfter.gain.setValueAtTime(0, ac.currentTime);
        setBufferAfter(cachedBufferAfter);
        setDurationAfter(sourceAfter.buffer?.duration ?? 0);
        setGainNodeAfter(gainAfter);
        setSourceAfter(sourceAfter);

        // Set initial gain values based on isBefore
        if (isBefore) {
          gainBefore.gain.setValueAtTime(volume, ac.currentTime);
          gainAfter.gain.setValueAtTime(0, ac.currentTime);
        } else {
          gainAfter.gain.setValueAtTime(volume, ac.currentTime);
          gainBefore.gain.setValueAtTime(0, ac.currentTime);
        }

        audioContextSuspend(ac);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
    audioContextSuspend(ac);

    // Cleanup on unmount
    return () => {
      isCancelled = true;
      stopAndDisconnectSource(sourceBefore);
      stopAndDisconnectSource(sourceAfter);
      if (ac) {
        audioContextSuspend(ac);
        ac.close();
      }
    };
  }, []);

  useEffect(() => {
    listenAndResize(canvasRefBefore, canvasRefAfter, bufferBefore, bufferAfter);
    async () => {
      await drawCanvas(canvasRefBefore, bufferBefore);
      await drawCanvas(canvasRefAfter, bufferAfter);
    };
  }, [bufferBefore, bufferAfter]);

  useEffect(() => {
    setCurrentAudioBuffer(isBefore ? bufferBefore : bufferAfter);
  }, [isBefore, bufferBefore, bufferAfter]);

  useEffect(() => {
    drawCursor(currentAudioBuffer, playerRef, currentTime, setCursorPosition);
  }, [currentTime, currentAudioBuffer]);

  const animationFrameRef = useRef<number | null>(null);
  const startTime = useRef(0);
  useEffect(() => {
    animationSafeguard(
      audioContext,
      isManualSeek,
      animationFrameRef,
      currentAudioBuffer,
      startTime,
      setCurrentTime
    );
    return () => {
      animationStop(animationFrameRef);
    };
  }, [audioContext, audioContext?.state, isManualSeek]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio(audioContext, setIsPlaying, sourceBefore, sourceAfter);
    } else {
      playAudio(
        audioContext,
        setIsPlaying,
        sourceBefore,
        sourceAfter,
        bufferBefore,
        bufferAfter,
        gainNodeBefore,
        gainNodeAfter,
        currentTime,
        setSourceBefore,
        setSourceAfter,
        isBefore
      );
    }
  };

  const handleSwitchAudio = () => {
    switchAudio(
      audioContext,
      sourceBefore,
      sourceAfter,
      bufferBefore,
      bufferAfter,
      gainNodeBefore,
      gainNodeAfter,
      currentTime,
      volume,
      startTime,
      setSourceBefore,
      setSourceAfter,
      setIsBefore,
      isBefore
    );
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    canvasSeek(
      e,
      audioContext,
      canvasRefBefore,
      canvasRefAfter,
      sourceBefore,
      sourceAfter,
      bufferBefore,
      bufferAfter,
      gainNodeBefore,
      gainNodeAfter,
      setSourceBefore,
      setSourceAfter,
      setIsManualSeek,
      setCurrentTime,
      startTime,
      isBefore
    );
    if (isBefore) {
      canvasRefBefore.current?.focus();
    } else {
      canvasRefAfter.current?.focus();
    }
  };

  useEffect(() => {
    function handleSpaceDown(event) {
      if (event.code === "Space") {
        event.preventDefault();
      }
    }
    function handleSpaceUp(event) {
      if (event.code === "Space") {
        if (isBefore) {
          if (canvasRefBefore.current && canvasRefBefore.current.contains(document.activeElement)) {
            handlePlayPause();
          }
        } else {
          if (canvasRefAfter.current && canvasRefAfter.current.contains(document.activeElement)) {
            handlePlayPause();
          }
        }
      }
    }
    if (canvasRefBefore.current) {
      canvasRefBefore.current.addEventListener("keydown", handleSpaceDown);
      canvasRefBefore.current.addEventListener("keyup", handleSpaceUp);
    }
    if (canvasRefAfter.current) {
      canvasRefAfter.current.addEventListener("keydown", handleSpaceDown);
      canvasRefAfter.current.addEventListener("keyup", handleSpaceUp);
    }
    return () => {
      if (canvasRefBefore.current) {
        canvasRefBefore.current.removeEventListener("keydown", handleSpaceDown);
        canvasRefBefore.current.removeEventListener("keyup", handleSpaceUp);
      }
      if (canvasRefAfter.current) {
        canvasRefAfter.current.removeEventListener("keydown", handleSpaceDown);
        canvasRefAfter.current.removeEventListener("keyup", handleSpaceUp);
      }
    };
  }, [handlePlayPause, canvasRefBefore, canvasRefBefore]);

  const onMuteToggled = () => {
    setMuted(!muted);
  };

  useEffect(() => {
    handleToggleMute(muted, volume, audioContext, gainNodeBefore, gainNodeAfter);
  }, [muted, handleToggleMute]);

  return (
    <div>
      <IncompatibilityNotice />

      <div className="rounded-xl border-2 border-bg px-3 py-2 bg-bg mb-4 last:mb-0 group focus-within:border-purple">
        {/* <div className="font-medium">
        Now playing:{" "}
        {isBefore
          ? srcBefore.split("/").pop()?.toUpperCase()
          : srcAfter.split("/").pop()?.toUpperCase()}
      </div> */}
        <div className="relative w-full mb-3" ref={playerRef}>
          <WaveformCanvas
            canvasRef={canvasRefBefore}
            handleCanvasClick={handleCanvasClick}
            isCurrent={isBefore}
          />
          <WaveformCanvas
            canvasRef={canvasRefAfter}
            handleCanvasClick={handleCanvasClick}
            isCurrent={!isBefore}
          />
          <PlaybackCursor cursorPosition={cursorPosition} />
          <BypassNotice isShown={isBefore} />
        </div>
        <Divider />
        {/* {sourceBefore && sourceAfter && audioContext && gainNodeBefore && gainNodeAfter && (
        <AudioMeter
          audioContext={audioContext}
          source={isBefore ? sourceBefore : sourceAfter}
          gain={isBefore ? gainNodeBefore : gainNodeAfter}
        />
      )} */}
        <div className="mt-3 flex flex-wrap flex-col lg:flex-row">
          <Stack direction={["column", "row"]}>
            <HStack spacing={2}>
              <ToggleFX isOn={!isBefore} onClick={handleSwitchAudio} />
              <PlayPauseButton onClick={handlePlayPause} isPlaying={isPlaying} />
            </HStack>
            <HStack>
              <HStack
                className="text-xl pr-5 h-10 rounded-md bg-bg2 border-grey border-2 w-56 lg:w-40 max-w-full"
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
                      handleVolumeChange(
                        value,
                        setVolume,
                        gainNodeBefore,
                        gainNodeAfter,
                        audioContext,
                        isBefore,
                        muted
                      )
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
              <HStack spacing={0}>
                <div className="w-9">{formatTime(currentTime)}</div>
                <div className="text-center">/</div>
                <div className="w-9 text-right">
                  {formatTime(isBefore ? durationBefore : durationAfter)}
                </div>
              </HStack>
            </HStack>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AudioComparison;
