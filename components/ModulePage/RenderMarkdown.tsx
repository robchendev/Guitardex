import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import A from "../Typography/A";
import H3 from "../Typography/H3";
import H4 from "../Typography/H4";
import P from "../Typography/P";
import GlossaryItem from "./GlossaryItem";
import TabImage from "./TabImage";

import dynamic from "next/dynamic";

const AudioVisualizer = dynamic(() => import("./AudioWaveform").then((module) => module.default), {
  ssr: false,
});

const BeforeAfterAudioVisualizer = dynamic(
  () => import("./BeforeAfterAudioWaveform").then((module) => module.default),
  { ssr: false }
);
const RenderMarkdown = ({
  contentMarkdown,
  addToGlossary,
}: {
  contentMarkdown: string;
  addToGlossary: (term: string, definition: string) => void;
}) => {
  return (
    <ReactMarkdown
      components={{
        img: (props) => {
          // This is hack to transform ![]() to anything we need
          switch (props.alt) {
            // case "music":
            //   return <AudioPlayer src={props.src} />;
            // case "music2":
            //   return (
            //     <audio controls className="flex-1 outline-none md:mr-5">
            //       <source src={props.src} />
            //     </audio>
            //   );
            case "music":
              // return <AudioVisualizer src={props.src} isStereo />;
              return (
                // <AudioVisualizer src="/audio/a/crash.mp3" isStereo />
                <BeforeAfterAudioVisualizer
                  srcBefore="/audio/a/avid.mp3"
                  srcAfter="/audio/a/avid_but_with_bad_eq.mp3"
                />
              );
            case "tab":
              return <TabImage src={props.src} />;
            default:
              return <div>"{props.alt}" not implemented!</div>;
          }
        },
        code: (props) => (
          <GlossaryItem item={props.children[0] as string} addToGlossary={addToGlossary} />
        ),
        h3: (props) => <H3 text={props.children} />,
        h4: (props) => <H4 text={props.children} />,
        p: (props) => <P text={props.children} />,
        a: (props) => <A text={props.children} href={props.href} />,
        li: (props) => <li className="list-disc ml-4 mb-2">{props.children}</li>,
      }}
    >
      {contentMarkdown}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;
