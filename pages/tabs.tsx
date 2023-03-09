import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import Wrapper from "../components/Wrapper";
import { Buy, Free, TabInfo, tabs } from "../config/tabs";

const TabButton = ({ button }: { button: Buy | Free }) => {
  switch (button.type) {
    case "buy":
      return (
        <div>
          ${button.price} <a href={button.link}>Buy</a>
        </div>
      );
    case "free":
      return (
        <div>
          free, <a href={button.link}>Get</a>
        </div>
      );
  }
};

const TabItem = ({ tab }: { tab: TabInfo }) => {
  return (
    <div className="py-4 px-5 w-full">
      <HStack justifyContent="space-between">
        <Box>
          <Text noOfLines={1}>{tab.title}</Text>
          <Text noOfLines={1}>{tab.source}</Text>
        </Box>
        <HStack justifyContent="space-between" spacing={8}>
          <div>
            <Text>{tab.tuning.name}</Text>
            <Text>{tab.tuning.strings.join(" ")}</Text>
          </div>
          <Center>{tab.genre}</Center>
          <Center>{tab.button && <TabButton button={tab.button} />}</Center>
          <VStack>
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
          </VStack>
        </HStack>
      </HStack>
    </div>
  );
};

const Tabs: NextPage = () => {
  return (
    <Wrapper title="tabs">
      <Center mb={4}>
        <input
          placeholder="search song, tuning, genre"
          className="border-gold border-px rounded-md py-3 px-4 bg-grey-hard w-72"
        />
      </Center>
      <Center>
        <VStack w="80%" divider={<div className="h-px w-full bg-grey-med" />}>
          {tabs.map((tab: TabInfo, index: number) => (
            <TabItem key={index} tab={tab} />
          ))}
        </VStack>
      </Center>
    </Wrapper>
  );
};

export default Tabs;
