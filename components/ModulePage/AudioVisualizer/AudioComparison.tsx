import React, { useCallback, useEffect, useRef, useState } from "react";
import Divider from "../../Sidebar/Divider";
// import AudioMeter from "../AudioMeter";
import { FaPause, FaPlay, FaPowerOff } from "react-icons/fa";
import { HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
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
  fetchAudioBuffer,
  formatTime,
  stopAndDisconnectSource,
} from "./common";

type Props = {
  srcBefore?: string;
  srcAfter?: string;
  defaultVolume?: number;
};

// Assumes both audio files are the same length
const AudioComparison = ({ srcBefore = "", srcAfter = "", defaultVolume = 0.5 }: Props) => {
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
    Promise.all([fetchAudioBuffer(ac, srcBefore), fetchAudioBuffer(ac, srcAfter)]).then(
      ([fetchedBufferBefore, fetchedBufferAfter]) => {
        if (isCancelled || ac.state === "closed") return;

        // Setup Before Audio
        const gainBefore = ac.createGain();
        const sourceBefore = ac.createBufferSource();
        sourceBefore.buffer = fetchedBufferBefore;
        sourceBefore.loop = true;
        sourceBefore.connect(gainBefore).connect(ac.destination);
        gainBefore.gain.setValueAtTime(volume, ac.currentTime);
        setBufferBefore(fetchedBufferBefore);
        setDurationBefore(sourceBefore.buffer.duration);
        setGainNodeBefore(gainBefore);
        setSourceBefore(sourceBefore);

        // Setup After Audio
        const gainAfter = ac.createGain();
        const sourceAfter = ac.createBufferSource();
        sourceAfter.buffer = fetchedBufferAfter;
        sourceAfter.loop = true;
        sourceAfter.connect(gainAfter).connect(ac.destination);
        gainAfter.gain.setValueAtTime(0, ac.currentTime);
        setBufferAfter(fetchedBufferAfter);
        setDurationAfter(sourceAfter.buffer.duration);
        setGainNodeAfter(gainAfter);
        setSourceAfter(sourceAfter);

        audioContextSuspend(ac);
      }
    );
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
    <div className="rounded-xl border-2 border-bg px-3 py-2 bg-bg mb-4 last:mb-0 group focus-within:border-purple">
      {/* <div className="font-medium">
        Now playing:{" "}
        {isBefore
          ? srcBefore.split("/").pop()?.toUpperCase()
          : srcAfter.split("/").pop()?.toUpperCase()}
      </div> */}
      <div className="relative w-full mb-3" ref={playerRef}>
        <canvas
          ref={canvasRefBefore}
          onClick={handleCanvasClick}
          style={{ display: isBefore ? "block" : "none", width: "100%" }}
          className="focus:outline-none"
          tabIndex={-1}
        ></canvas>
        <canvas
          ref={canvasRefAfter}
          onClick={handleCanvasClick}
          style={{ display: isBefore ? "none" : "block", width: "100%" }}
          className="focus:outline-none"
          tabIndex={-1}
        ></canvas>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${cursorPosition}px`,
            width: "3px",
            height: "100%",
            border: "1px solid black",
            backgroundColor: "#e7edf3",
            display: currentTime !== 0 ? "block" : "none",
          }}
        />
        <div
          className="text-ghost text-xl"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            display: isBefore ? "block" : "none",
          }}
        >
          Bypassing FX
        </div>
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
        <HStack>
          <button
            className={`px-3 py-2 h-10 rounded-md font-medium ${
              isBefore ? "border-grey bg-grey text-ghost" : "border-purple bg-purple text-white"
            }`}
            onClick={handleSwitchAudio}
          >
            <HStack>
              <FaPowerOff />
              <div className="leading-4">FX</div>
            </HStack>
          </button>
          <button
            className="px-3 py-2 h-10 border-2 border-grey bg-bg2 rounded-md text-text"
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <HStack
            className="text-xl pr-5 h-10 rounded-md bg-bg2 border-grey border-2 w-40 max-w-full"
            spacing={0}
          >
            <VolumeIcon volumeLevel={volume} muted={muted} onClick={onMuteToggled} />
            <div className="w-full py-2">
              <Slider
                defaultValue={volume}
                value={muted ? 0 : volume}
                min={0}
                max={1}
                step={0.01}
                onChange={(value) => {
                  setMuted(false);
                  handleVolumeChange(
                    value,
                    setVolume,
                    gainNodeBefore,
                    gainNodeAfter,
                    audioContext,
                    isBefore,
                    muted
                  );
                }}
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
      </div>
    </div>
  );
};

export default AudioComparison;
