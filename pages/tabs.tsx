import { Center, HStack, Input } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import Wrapper from "../components/Wrapper";
import { TabInfo, tabs } from "../config/tabs";

const TabItem = ({ tab }: { tab: TabInfo }) => {
  return (
    <div>
      <HStack>
        <div>
          <div>{tab.title}</div>
          <div>{tab.source}</div>
          <div>{tab.artist}</div>
        </div>
        <div>
          {tab.button.type === "buy" && (
            <div>
              {tab.button.price} <a href={tab.button.link}>Buy</a>
            </div>
          )}
          {tab.button.type === "free" && (
            <div>
              free, <a href={tab.button.link}>Get</a>
            </div>
          )}
        </div>
        <div>{tab.genre}</div>
        <div>
          <div>{tab.tuning.name}</div>
          <div>{tab.tuning.strings.toString()}</div>
        </div>
        <div>
          {tab.videoLink && (
            <a href={tab.videoLink}>
              <FaYoutube />
            </a>
          )}
          {tab.spotifyLink && (
            <a href={tab.videoLink}>
              <FaSpotify />
            </a>
          )}
        </div>
      </HStack>
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
