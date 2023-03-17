import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import Wrapper from "../components/Wrapper";
import { Buy, Free, TabInfo, tabs } from "../config/tabs";
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";

const purgeLink = (link: string) => link.replace(/http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/g, "");

const TabButton = ({ button }: { button: Buy | Free }) => {
  switch (button.type) {
    case "buy":
      return (
        <HStack>
          <Text>${button.price}</Text>
          <a
            onClick={(e) => e.stopPropagation()}
            href={button.link}
            className="block ml-2 px-3 pb-2 pt-1.5 rounded-md bg-carmine-soft hover:bg-carmine-hard transition ease-in duration-300"
          >
            Buy
          </a>
        </HStack>
      );
    case "free":
      return (
        <HStack>
          <Text>free</Text>
          <a
            onClick={(e) => e.stopPropagation()}
            href={button.link}
            className="block 1ml-2 px-3 pb-2 pt-1.5 rounded-md bg-carmine-soft hover:bg-carmine-hard transition ease-in duration-300"
          >
            Get
          </a>
        </HStack>
      );
  }
};

const TabDetailPrice = ({ button }: { button: Buy | Free }) => {
  switch (button.type) {
    case "buy":
      return <Text>${button.price}</Text>;
    case "free":
      return <Text>free</Text>;
  }
};

const TabDetailLink = ({ button }: { button: Buy | Free }) => {
  switch (button.type) {
    case "buy":
      return (
        <Text noOfLines={1}>
          <a className="text-gold" href={button.link}>
            {purgeLink(button.link)}
          </a>
        </Text>
      );
    case "free":
      return (
        <Text noOfLines={1}>
          <a className="text-gold" href={button.link}>
            placeholder link for free
          </a>
        </Text>
      );
  }
};

const Difficulty = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating / 2);
  const half = rating % 2;
  const empty = Math.floor((10 - rating) / 2);
  console.log([...Array(full)]);
  return (
    <HStack spacing={1}>
      {[...Array(full)].map((val: number, index: number) => (
        <ImStarFull key={index} />
      ))}
      {half === 1 && <ImStarHalf />}
      {[...Array(empty)].map((val: number, index: number) => (
        <ImStarEmpty key={index} />
      ))}
    </HStack>
  );
};

const TabItem = ({ tab }: { tab: TabInfo }) => {
  return (
    <AccordionItem className="w-full border-none box shadow-md shadow-black-hard/20" p="0">
      <AccordionButton
        px={4}
        py={3}
        className="w-full"
        justifyContent="space-between"
        textAlign="left"
      >
        <Box className="w-full md:w-5/12">
          <Text fontWeight={500} noOfLines={1} className="text-gold">
            {tab.title}
          </Text>
          <Text noOfLines={1}>{tab.source}</Text>
        </Box>
        <div className="hidden md:block">
          <HStack justifyContent="space-between" spacing={7}>
            <div>
              <Text>{tab.tuning.strings.join(" ")}</Text>
            </div>
            <Center w={20}>
              <Text>{tab.genre}</Text>
            </Center>
            <Center>{tab.button && <TabButton button={tab.button} />}</Center>
            <HStack>
              <Link href={tab.spotifyLink} isExternal>
                <IconButton
                  onClick={(e) => e.stopPropagation()}
                  as={FaSpotify}
                  aria-label="Spotify"
                  bgColor="transparent"
                  _hover={{ bgColor: "transparent" }}
                  className={
                    tab.spotifyLink
                      ? "text-white-soft hover:text-gold transition ease-in duration-300"
                      : "text-grey-med"
                  }
                  size="sm"
                  disabled={!tab.spotifyLink}
                />
              </Link>
              <Link href={tab.videoLink} isExternal>
                <IconButton
                  onClick={(e) => e.stopPropagation()}
                  as={FaYoutube}
                  aria-label="Youtube"
                  bgColor="transparent"
                  _hover={{ bgColor: "transparent" }}
                  className={
                    tab.videoLink
                      ? "text-white-soft hover:text-gold transition ease-in duration-300"
                      : "text-grey-med"
                  }
                  size="sm"
                  disabled={!tab.videoLink}
                />
              </Link>
            </HStack>
          </HStack>
        </div>
      </AccordionButton>
      <AccordionPanel pt={0} pb={4} px={4}>
        <table className="[&>tbody>tr>td:first-child]:w-0 [&>tbody>tr]:border-grey-med [&>tbody>tr]:border-t [&>tbody>tr]:border-b  [&>tbody>tr>td]:py-1 [&>tbody>tr>td:first-child]:text-white-ghost [&>tbody>tr>td:first-child]:pr-4 w-full">
          <tbody>
            <tr>
              <td>Link</td>
              <td>
                <TabDetailLink button={tab.button} />
              </td>
            </tr>
            <tr>
              <td>Difficulty</td>
              <td>
                <Difficulty rating={tab.difficulty} />
              </td>
            </tr>
            {tab.guitardex && (
              <tr>
                <td>Guitardex</td>
                <td>
                  <a className="text-gold" href={tab.guitardex}>
                    <Text noOfLines={1}>{purgeLink(tab.guitardex)}</Text>
                  </a>
                </td>
              </tr>
            )}
            <tr>
              <td>Song</td>
              <td>{tab.title}</td>
            </tr>
            <tr>
              <td>Source</td>
              <td>{tab.source}</td>
            </tr>
            <tr>
              <td>Artist(s)</td>
              <td>{tab.artist}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>
                <TabDetailPrice button={tab.button} />
              </td>
            </tr>
            <tr>
              <td>Genre</td>
              <td>{tab.genre}</td>
            </tr>
            <tr>
              <td>Tuning</td>
              <td>{tab.tuning.name}</td>
            </tr>
            <tr>
              <td>Strings</td>
              <td>{tab.tuning.strings.join(" ")}</td>
            </tr>
            {tab.videoLink && (
              <tr>
                <td>Youtube</td>
                <td>
                  <a className="text-gold" href={tab.videoLink}>
                    <Text noOfLines={1}>{purgeLink(tab.videoLink)}</Text>
                  </a>
                </td>
              </tr>
            )}
            {tab.spotifyLink && (
              <tr>
                <td>Spotify</td>
                <td>
                  <a className="text-gold" href={tab.spotifyLink}>
                    <Text noOfLines={1}>{purgeLink(tab.spotifyLink)}</Text>
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AccordionPanel>
    </AccordionItem>
  );
};

const Tabs: NextPage = () => {
  return (
    <Wrapper title="Tabs">
      <Center mb={4}>
        <input
          placeholder="Search song, tuning, genre"
          className="border-gold border-px rounded-md py-3 px-4 bg-grey-hard w-72"
        />
      </Center>
      <Accordion allowToggle w="full" className="px-4 md:px-0">
        <Center>
          <VStack w="100%" spacing={4}>
            {tabs.map((tab: TabInfo, index: number) => (
              <TabItem key={index} tab={tab} />
            ))}
          </VStack>
        </Center>
      </Accordion>
    </Wrapper>
  );
};

export default Tabs;
