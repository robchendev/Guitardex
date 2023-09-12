---
id: 0
name: 0_Waveform_Demos
category: general
difficulty: easy
requirements: []
---

### About

These featured audio waveform visualizers are made for the upcoming Audio Production modules, to assist in demonstrating the implementation of certain effects through both audio and visual representation. Please try them out, and if you encounter any issues, please [report it](/contact?t=Report_Issue&l=a&id=0). Include steps to reproduce the bug, browser name, browser version, and your operating system if possible.

### Audio Comparison Visualizer

Uses two audio files (192kbps, 44.1kHz, 16-bit), each representing:

- the "before" state of applying an effect.
- the "after" state of applying an effect.

Initiated with the FX turned off, users can:

- switch between the before and after of applying an effect by toggling the "FX" button.
- play, pause, and adjust the volume of the audio.
- seek audio playback position by clicking on the waveform.

#### Issue: iOS Devices

On iOS devices, the audio will not play at all due to Apple's implementation of Web Audio API in iOS Silent Mode. Somehow, HTML5 Audio works fine, but Web Audio API doesn't. No one knows why this was implemented this way, but due to this limitation iOS users will get a prompt that reminds them to turn off Silent Mode or to wear headphones before listening to the visualizers.

#### Issue: Bluetooth Audio Devices

Some bluetooth audio devices (especially the airpod) delaying the playback to make the latency seem invisible when matching up with the screen. This causes a minor delay before resuming audio that was paused. This also somehow causes the left ear to pause playback shortly after the right ear instead of pausing them both simultaneously. More testing is needed, but so far this current is confirmed to be the case on 2nd generation Airpod Pros.

#### Comparison: Stereo + Stereo

![comparison](/audio/a/neverGonna.mp3&/audio/a/neverGonnaCompressYou.mp3)

#### Comparison: Mono + Stereo

![comparison](/audio/a/avidMono.mp3&/audio/a/Avid.mp3)

### Audio Singular Visualizer

Used for visualizing audio waveforms that aren't being compared.

#### Visualizer: Stereo

![visualizer](/audio/a/neverGonna.mp3)

#### Visualizer: Mono

![visualizer](/audio/a/avidMono.mp3)
