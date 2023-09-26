import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import A from "../Typography/A";
import H3 from "../Typography/H3";
import H4 from "../Typography/H4";
import P from "../Typography/P";
import GlossaryItem from "./GlossaryItem";
import TabImage from "./TabImage";

import dynamic from "next/dynamic";
import InvalidGlossaryItem from "./InvalidGlossaryItem";

const AudioVisualizer = dynamic(
  () => import("./AudioVisualizer/AudioVisualizer").then((module) => module.default),
  {
    ssr: false,
  }
);

const AudioComparison = dynamic(
  () => import("./AudioVisualizer/AudioComparison").then((module) => module.default),
  { ssr: false }
);

const RenderMarkdown = ({ contentMarkdown }: { contentMarkdown: string }) => {
  return (
    <ReactMarkdown
      components={{
        img: (props) => {
          // This is hack to transform ![]() to anything we need
          let src: string[];
          switch (props.alt) {
            case "comparison":
            case "comparisonBefore":
              src = props.src?.split("&") ?? ["", ""];
              return (
                <AudioComparison
                  srcBefore={src[0]}
                  srcAfter={src[1]}
                  defaultVolume={1}
                  defaultTrack="before"
                />
              );
            case "comparisonAfter":
              src = props.src?.split("&") ?? ["", ""];
              return (
                <AudioComparison
                  srcBefore={src[0]}
                  srcAfter={src[1]}
                  defaultVolume={1}
                  defaultTrack="after"
                />
              );
            case "visualizer":
              return <AudioVisualizer src={props.src} defaultVolume={1} />;
            case "tab":
              return <TabImage src={props.src} />;
            default:
              return <div>"{props.alt}" not implemented!</div>;
          }
        },
        code: (props) => {
          const codeItem = props.children[0] as string;
          if (codeItem.includes("|")) {
            const [t, d] = codeItem.split("|");
            const term = t.trim();
            const definition = d.trim();
            if (!term || !definition) return <></>;
            return <GlossaryItem term={term} definition={definition} />;
          }
          return <InvalidGlossaryItem />;
        },
        h3: (props) => <H3 text={props.children} />,
        h4: (props) => <H4 text={props.children} />,
        p: (props) => <P text={props.children} />,
        a: (props) => <A text={props.children} href={props.href} />,
        ul: (props) => <ul className="list-disc mb-4">{props.children}</ul>,
        ol: (props) => <ol className="list-decimal mb-4">{props.children}</ol>,
        li: (props) => <li className="ml-4 mb-0.5">{props.children}</li>,
        strong: (props) => (
          <strong className="font-medium underline underline-offset-2">{props.children}</strong>
        ),
      }}
    >
      {contentMarkdown}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;
