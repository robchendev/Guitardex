import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import A from "../Typography/A";
import H3 from "../Typography/H3";
import H4 from "../Typography/H4";
import P from "../Typography/P";
import AudioPlayer from "./AudioPlayer";
import GlossaryItem from "./GlossaryItem";
import TabImage from "./TabImage";

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
            case "music":
              return <AudioPlayer src={props.src} />;
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
      }}
    >
      {contentMarkdown}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;
