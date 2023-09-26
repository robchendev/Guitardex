const audioCache: { [key: string]: Promise<AudioBuffer> } = {};

export const fetchAudioBuffer = async (
  audioContext: AudioContext,
  url: string
): Promise<AudioBuffer> => {
  // console.log("fetchAudioBuffer called");
  // console.log("Current cache:", audioCache);
  // console.log("URL:", url);
  const response: Response = await fetch(url);
  const arrayBuffer: ArrayBuffer = await response.arrayBuffer();
  const decodedAudioData = await (audioContext as AudioContext).decodeAudioData(arrayBuffer);
  // Might be a firefox bug, decodeAudioData forces audioContext.state to running.
  if (audioContext.state === "running") {
    await audioContext.suspend();
  }
  return decodedAudioData;
};

export const getAudioFromCache = async (
  audioContext: AudioContext,
  url: string
): Promise<AudioBuffer> => {
  // console.log("getAudioFromCache");
  if (!audioCache[url]) {
    // Cache a promise that resolves to the AudioBuffer
    audioCache[url] = fetchAudioBuffer(audioContext, url).catch((e) => {
      // Remove from cache if it fails so future requests will try again
      delete audioCache[url];
      throw e;
    });
  }
  return audioCache[url];
};
