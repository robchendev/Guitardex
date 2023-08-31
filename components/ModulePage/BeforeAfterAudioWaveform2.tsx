import React, { useEffect, useState } from "react";

type Props = {
  srcBefore?: string;
  srcAfter?: string;
  // defaultVolume?: number;
};

const BeforeAfterAudioWaveform2 = ({ srcBefore = "", srcAfter = "" }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNodeBefore, setGainNodeBefore] = useState<GainNode | null>(null);
  const [gainNodeAfter, setGainNodeAfter] = useState<GainNode | null>(null);
  const [sourceBefore, setSourceBefore] = useState<AudioBufferSourceNode | null>(null);
  const [sourceAfter, setSourceAfter] = useState<AudioBufferSourceNode | null>(null);
  const [isBefore, setIsBefore] = useState(true);

  const fetchAudioBuffer = async (audioContext, url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  };

  useEffect(() => {
    const ac = new AudioContext();
    setAudioContext(ac);
    Promise.all([fetchAudioBuffer(ac, srcBefore), fetchAudioBuffer(ac, srcAfter)]).then(
      ([bufferBefore, bufferAfter]) => {
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

        gainBefore.gain.setValueAtTime(1, ac.currentTime);
        gainAfter.gain.setValueAtTime(0, ac.currentTime);

        sourceBefore.start();
        sourceAfter.start();

        setGainNodeBefore(gainBefore);
        setGainNodeAfter(gainAfter);
        setSourceBefore(sourceBefore);
        setSourceAfter(sourceAfter);
      }
    );

    return () => {
      if (sourceBefore) sourceBefore.stop();
      if (sourceAfter) sourceAfter.stop();
    };
  }, []);

  const switchAudio = () => {
    if (audioContext) {
      if (isBefore) {
        gainNodeBefore?.gain.setValueAtTime(0, audioContext.currentTime);
        gainNodeAfter?.gain.setValueAtTime(1, audioContext.currentTime);
      } else {
        gainNodeBefore?.gain.setValueAtTime(1, audioContext.currentTime);
        gainNodeAfter?.gain.setValueAtTime(0, audioContext.currentTime);
      }
    }
    setIsBefore(!isBefore);
  };

  return (
    <div>
      {/* Your waveform visualization here */}
      <button onClick={switchAudio}>Switch Audio</button>
    </div>
  );
};

export default BeforeAfterAudioWaveform2;
