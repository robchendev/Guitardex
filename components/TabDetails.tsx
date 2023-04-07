import { AccordionPanel } from "@chakra-ui/react";
import React from "react";
import { TabInfo } from "../types/tabs";
import prepLink from "../utils/prepLink";
import { Tab } from "./Tab/_index";
import Truncate from "./Truncate";

const TabDetails = ({
  tab: { button, difficulty, guitardex, title, source, artist, genre, tuning, youtube, spotify },
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
          <Tab.Detail label="Song">{title}</Tab.Detail>
          <Tab.Detail label="Source" disabled={!source}>
            {source}
          </Tab.Detail>
          <Tab.Detail label="Artist">{artist}</Tab.Detail>
          <Tab.Detail label="Price">{button ? <Tab.Price button={button} /> : ""}</Tab.Detail>
          <Tab.Detail label="Tuning" disabled={!tuning} pre>
            {tuning?.name}
            <br />
            {tuning?.strings}
          </Tab.Detail>
          <Tab.Detail label="Guitardex" disabled={!guitardex}>
            <Truncate href={prepLink(guitardex)}>{guitardex}</Truncate>
          </Tab.Detail>
          <Tab.Detail label="Youtube" disabled={!youtube}>
            <Truncate href={prepLink(youtube)}>{youtube}</Truncate>
          </Tab.Detail>
          <Tab.Detail label="Spotify" disabled={!spotify}>
            <Truncate href={prepLink(spotify)}>{spotify}</Truncate>
          </Tab.Detail>
        </tbody>
      </table>
    </AccordionPanel>
  );
};

export default TabDetails;
