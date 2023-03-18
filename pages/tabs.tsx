import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  ExpandedIndex,
  Flex,
  HStack,
  IconButton,
  Link,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import Wrapper from "../components/Wrapper";
import { tabs } from "../config/tabs";
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";
import { Buy, Free, TabInfo } from "../types/tabs";

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
        <a className="text-gold" href={button.link}>
          <p className="truncate">{purgeLink(button.link)}</p>
        </a>
      );
    case "free":
      return (
        <a className="text-gold" href={button.link}>
          <p className="truncate">placeholder link for free</p>
        </a>
      );
  }
};

const Difficulty = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating / 2);
  const half = rating % 2;
  const empty = Math.floor((10 - rating) / 2);
  return (
    <span>
      <HStack spacing={1}>
        {[...Array(full)].map((val: number, index: number) => (
          <ImStarFull key={index} />
        ))}
        {half === 1 && <ImStarHalf />}
        {[...Array(empty)].map((val: number, index: number) => (
          <ImStarEmpty key={index} />
        ))}
      </HStack>
    </span>
  );
};

const TabItem = ({ tab, newSearch }: { tab: TabInfo; newSearch?: boolean }) => {
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
          <p className="truncate font-medium text-gold">{tab.title}</p>
          <p className="truncate">{tab.source || tab.artist}</p>
        </Box>
        <div className="hidden md:block">
          <HStack justifyContent="space-between" spacing={7}>
            {tab.tuning && (
              <div>
                <p>{tab.tuning.strings.join(" ")}</p>
              </div>
            )}
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
                      : "text-grey-med cursor-default"
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
                      : "text-grey-med cursor-default"
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
        <table className="table-fixed [&>tbody>tr>td:first-child]:w-24 [&>tbody>tr]:border-grey-med [&>tbody>tr]:border-t [&>tbody>tr]:border-b  [&>tbody>tr>td]:py-1 [&>tbody>tr>td:first-child]:text-white-ghost w-full">
          <tbody>
            <tr>
              <td>Link</td>
              <td>{tab.button ? <TabDetailLink button={tab.button} /> : ""}</td>
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
                    <p className="truncate">{purgeLink(tab.guitardex)}</p>
                  </a>
                </td>
              </tr>
            )}
            <tr>
              <td>Song</td>
              <td>{tab.title}</td>
            </tr>
            {tab.source && (
              <tr>
                <td>Source</td>
                <td>{tab.source}</td>
              </tr>
            )}
            <tr>
              <td>Artist(s)</td>
              <td>{tab.artist}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{tab.button ? <TabDetailPrice button={tab.button} /> : ""}</td>
            </tr>
            <tr>
              <td>Genre</td>
              <td>{tab.genre}</td>
            </tr>
            {tab.tuning && (
              <tr>
                <td>Tuning</td>
                <td>
                  {tab.tuning.name}
                  <br />
                  {tab.tuning.strings.join(" ")}
                </td>
              </tr>
            )}
            {tab.videoLink && (
              <tr>
                <td>Youtube</td>
                <td>
                  <a className="text-gold" href={tab.videoLink}>
                    <p className="truncate">{purgeLink(tab.videoLink)}</p>
                  </a>
                </td>
              </tr>
            )}
            {tab.spotifyLink && (
              <tr>
                <td>Spotify</td>
                <td>
                  <a className="text-gold" href={tab.spotifyLink}>
                    <p className="truncate">{purgeLink(tab.spotifyLink)}</p>
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
  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState<TabInfo[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | undefined>(undefined);
  const [difficulty, setDifficulty] = useState<number[]>([0, 10]);

  const onChange = (searchString: string) => {
    setSearch(searchString);
    setExpandedIndex(-1);
  };
  useEffect(() => {
    const filter = (keywords: string): TabInfo[] => {
      const matchingTabs: TabInfo[] = [];
      for (const tab of tabs) {
        if (
          tab.difficulty >= difficulty[0] &&
          tab.difficulty <= difficulty[1] &&
          (tab.title.toLowerCase().includes(keywords) ||
            tab.source?.toLowerCase().includes(keywords) ||
            tab.artist?.toLowerCase().includes(keywords) ||
            tab.genre.toLowerCase().includes(keywords) ||
            (tab.tuning &&
              (tab.tuning.name.toLowerCase().includes(keywords) ||
                tab.tuning.strings.join("").toLowerCase().includes(keywords.replace(/\s/g, "")))))
        ) {
          matchingTabs.push(tab);
        }
      }
      return matchingTabs;
    };
    const newResult: TabInfo[] = filter(search.toLowerCase());
    console.log(newResult);
    setResult(newResult);
  }, [search, difficulty]);

  return (
    <Wrapper title="Tabs">
      <Center mb={4}>
        <input
          placeholder="Search song, tuning, genre"
          className="border-gold border-px rounded-md py-3 px-4 bg-grey-hard w-72"
          value={search}
          onChange={(e) => onChange(e.target.value)}
        />
      </Center>
      <Center>
        <div className="w-2/5 mb-3">
          {difficulty[0] !== difficulty[1] ? (
            <Flex gap={2} alignItems="center" justifyContent="center">
              From <Difficulty rating={difficulty[0]} /> to <Difficulty rating={difficulty[1]} />
            </Flex>
          ) : (
            <Flex gap={2} alignItems="center" justifyContent="center">
              Exactly <Difficulty rating={difficulty[0]} />
            </Flex>
          )}
          <RangeSlider
            // eslint-disable-next-line
            aria-label={["min", "max"]}
            min={0}
            max={10}
            defaultValue={difficulty}
            onChange={(rating) => setDifficulty(rating)}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </div>
      </Center>

      <Accordion
        allowToggle
        w="full"
        className="px-4 md:px-0"
        index={expandedIndex}
        onChange={(i: number) => setExpandedIndex(i)} // number | number[] only if allowMultiple
      >
        <Center>
          <VStack w="100%" spacing={4}>
            {search && !result.length && <p>No matching tabs found</p>}
            {(!!search || difficulty[0] !== 0 || difficulty[1] !== 10 ? result : tabs).map(
              (tab: TabInfo, index: number) => (
                <TabItem key={index} tab={tab} />
              )
            )}
          </VStack>
        </Center>
      </Accordion>
    </Wrapper>
  );
};

export default Tabs;
