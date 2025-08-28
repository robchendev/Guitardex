## File Naming

Each file in the directories `dynamic/techniques/` or `dynamic/audioProduction/` follow the format of `id-name-of-module.md`. The `id` here is used to generate the URL of the page. For example, the file `dynamic/techniques/1-thumb-slap.md` will be mapped to the path `guitardex.com/t/1`.

## Module FrontMatter

### Common FrontMatter

These frontmatter is shared amongst all libraries.

- id: Unique identification number of the module.
- name:
- category:
- difficulty:
- requirements: Name and ID of each

### Technique Example

```
---
id: 13
name: Nail Attack Strum
category: percussion
difficulty: easy
requirements: [{ name: Nail Attack, id: 12 }, { name: Strum, id: 16 }]
demo: zZDqVblqDjc
---

<contents>
```

- id: the identification number of the module. You'll see this is the first
- name:
- category:
- difficulty:
- requirements: Name and ID of each

### Audio Production Example

```
---
id: 0
name: Library Features
category: demo
requirements: []
---

<contents>
```

- id: the identification number of the module. You'll see this is the first
- name:
- category:
- difficulty:
- requirements:

# Contents

## Usage Syntax

The syntax for these markdown (.md) files use a modified version of the [basic markdown syntax](https://www.markdownguide.org/basic-syntax/), so some of the syntax used might not produce results you expect. Here is the customized syntax. Anything not mentioned below uses the basic markdown syntax.

### Term and Definition

This term and definition will also appear at the top of the module page.

Format: `<term> | <definition>`

Example: `fret wire | the metal strips on your fretboard`

### Tab

Image of a tab, screenshotted from Guitar Pro, that is also handled by dark mode.

The color of the image is crucial: The screenshot taken needs to be from within Guitar Pro since the music sheet's background is `#FAFAFA`, compared to a PDF export's background color which is `#FFFFFF`. The background of Guitardex's light mode is `#FAFAFA`, which will blend seamlessly with the image. The dark mode uses CSS filters to change the color of the tab image so that it is also seamless with the dark mode's background.

Format: `![tab](<path to image file>)`

Example: `![tab](/img/t/thumb-slap-strum.jpg)`

### Underlined and Bolded Text

Normally `**Text**` would simply be bolded. For clarity purposes, it is both bolded and underlined.

Format: `**<text>**`

Example: `**This text is underlined**`

### Audio File Upload and Linking

The files being used is to be uploaded to `/public/audio/a` for the Audio Production library, and to `/public/audio/t` for the Techniques library. When linking to these files anywhere, do not include `/public`.

Example: A file uploaded as `/public/audio/a/audioFile.mp3` will be present in the live site as `guitardex.com/audio/a/audioFile.mp3`.

Note: Please only do this with small audio files, ideally a LFS or external links would be used but that isn't implemented at this time.

### Audio Comparison Visualizer

Uses two audio files (192kbps, 44.1kHz, 16-bit), each representing:

- the "before" state of applying an effect.
- the "after" state of applying an effect.

Initiated with the FX turned off, users can:

- switch between the before and after of applying an effect by toggling the "FX" button.
- play, pause, and adjust the volume of the audio.
- seek audio playback position by clicking on the waveform.

Format (FX default off): `![comparison](<path to audio file #1>&<path to audio file #2>)`
Format (FX default on): `![comparisonAfter](<path to audio file #1>&<path to audio file #2>)`

Example: `![comparison](/audio/a/neverGonna.mp3&/audio/a/neverGonnaCompressYou.mp3)`

Ensure there are no spaces in the parentheses () otherwise the code won't recognize it.

### Audio Visualizer

Used for visualizing audio waveforms.

Format: `![visualizer](<path to mp3 file>)`

### Insight Blocks

Format:

```
> Title | Body text here. Put any text you want here and it will show up in the opening fold when a user clicks the Insight Block's title.
```

Example:

```
> Opinion: Background synths | I dont think you should use background synths with guitar audio, purely because the reason for using it is usually to make up for the lack of color in your playing. It makes the presentation of the guitar recording dishonest. If you do this, please let your audience know that you are using background synths.
```

This Insight Block currently does not support more than one line (referring to new lines, which are generated when you press enter).
