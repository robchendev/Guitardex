import { AccordionPanel } from "@chakra-ui/react";
import React from "react";
import { TabInfo } from "../types/tabs";
import purgeLink from "../utils/purgeLink";
import { Tab } from "./Tab/_index";
import Truncate from "./Truncate";

const TabDetails = ({
  tab: {
    button,
    difficulty,
    guitardex,
    title,
    source,
    artist,
    genre,
    tuning,
    videoLink,
    spotifyLink,
  },
}: {
  tab: TabInfo;
}) => {
  return (
    <AccordionPanel pt={0} pb={4} px={4}>
      <table className="table-fixed w-full">
        <tbody>
          <Tab.Detail label="Link">{button ? <Tab.Link button={button} /> : ""}</Tab.Detail>
          <Tab.Detail label="Difficulty">
            <Tab.Difficulty rating={difficulty} hasNum />
          </Tab.Detail>
          <Tab.Detail label="Guitardex" disabled={!guitardex}>
            <Truncate href={guitardex}>{purgeLink(guitardex)}</Truncate>
          </Tab.Detail>
          <Tab.Detail label="Song">{title}</Tab.Detail>
          <Tab.Detail label="Source" disabled={!source}>
            {source}
          </Tab.Detail>
          <Tab.Detail label="Artist">{artist}</Tab.Detail>
          <Tab.Detail label="Price">{button ? <Tab.Price button={button} /> : ""}</Tab.Detail>
          <Tab.Detail label="Genre">{genre}</Tab.Detail>
          <Tab.Detail label="Tuning" disabled={!tuning}>
            {tuning?.name}
            <br />
            {tuning?.strings}
          </Tab.Detail>
          <Tab.Detail label="Youtube" disabled={!videoLink}>
            <Truncate href={videoLink}>{purgeLink(videoLink)}</Truncate>
          </Tab.Detail>
          <Tab.Detail label="Spotify" disabled={!spotifyLink}>
            <Truncate href={spotifyLink}>{purgeLink(spotifyLink)}</Truncate>
          </Tab.Detail>
        </tbody>
      </table>
    </AccordionPanel>
  );
};

export default TabDetails;
