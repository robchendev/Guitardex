import { Center, Input } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import Wrapper from "../components/Wrapper";
import { TabInfo, tabs } from "../config/tabs";

const TabItem = ({ tab }: { tab: TabInfo }) => {
  return (
    <div>
      <div>{tab.title}</div>
      <div>{tab.source}</div>
      <div>{tab.artist}</div>
      <div>{tab.genre}</div>
      <div>{tab.tuning.name}</div>
      <div>{tab.tuning.strings.toString()}</div>
      <div>{tab.videoLink}</div>
      <div>{tab.spotifyLink}</div>
      {tab.button.type === "buy" && (
        <div>
          {tab.button.price}, {tab.button.link}
        </div>
      )}
      {tab.button.type === "free" && <div>free, {tab.button.link}</div>}
    </div>
  );
};

const Tabs: NextPage = () => {
  return (
    <Wrapper title="tabs">
      <Center>
        <Input w={60} placeholder="search song, tuning, genre" />
      </Center>
      {tabs.map((tab: TabInfo, index: number) => (
        <TabItem key={index} tab={tab} />
      ))}
    </Wrapper>
  );
};

export default Tabs;
