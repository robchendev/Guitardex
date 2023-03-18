import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
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
        <HStack justifyContent="flex-end">
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
        <HStack justifyContent="flex-end">
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

const Difficulty = ({ rating, hasNum = false }: { rating: number; hasNum?: boolean }) => {
  const full = Math.floor(rating / 2);
  const half = rating % 2;
  const empty = Math.floor((10 - rating) / 2);
  return (
    <span>
      <HStack spacing={1} className="text-lg">
        {[...Array(full)].map((val: number, index: number) => (
          <ImStarFull key={index} />
        ))}
        {half === 1 && <ImStarHalf />}
        {[...Array(empty)].map((val: number, index: number) => (
          <ImStarEmpty key={index} />
        ))}
        {hasNum && <p className="pl-1">{(rating / 2).toFixed(1)}</p>}
      </HStack>
    </span>
  );
};

const TabItem = ({
  tab,
  isDifficultyFilter = false,
}: {
  tab: TabInfo;
  isDifficultyFilter?: boolean;
}) => {
  return (
    <AccordionItem className="w-full border-none box shadow-md shadow-black-hard/20" p="0">
      <AccordionButton
        px={4}
        py={3}
        className="w-full"
        justifyContent="space-between"
        textAlign="left"
      >
        <Box className="w-full md:w-2/5">
          <p className="truncate font-medium text-gold">{tab.title}</p>
          <p className="truncate">{tab.source || tab.artist}</p>
          {isDifficultyFilter && <Difficulty rating={tab.difficulty} hasNum />}
        </Box>
        <Box className="hidden md:block w-3/5 pl-8">
          <HStack spacing={0}>
            <Box className="w-3/12 text-center">{tab.tuning && tab.tuning.strings}</Box>
            <Text className="w-4/12 text-center">{tab.genre}</Text>
            <Box className="w-3/12 pr-4">{tab.button && <TabButton button={tab.button} />}</Box>
            <Box className="w-2/12">
              <HStack justifyContent="flex-end">
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
            </Box>
          </HStack>
        </Box>
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
                <Difficulty rating={tab.difficulty} hasNum />
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
              <td>Artist</td>
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
                  {tab.tuning.strings}
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
                tab.tuning.strings
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .includes(keywords.replace(/\s/g, "")))))
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
          placeholder="Search song, artist, tuning, genre"
          className="border-gold border-px rounded-md py-3 px-4 bg-grey-hard w-72"
          value={search}
          onChange={(e) => onChange(e.target.value)}
        />
      </Center>
      <Box mb={3}>
        <div className="text-lg">
          {difficulty[0] !== difficulty[1] ? (
            <Flex gap={2} alignItems="center" justifyContent="center">
              Difficulty: <Difficulty rating={difficulty[0]} /> to{" "}
              <Difficulty rating={difficulty[1]} />
            </Flex>
          ) : (
            <Flex gap={2} alignItems="center" justifyContent="center">
              Difficulty: <Difficulty rating={difficulty[0]} />
            </Flex>
          )}
        </div>
        <Center>
          <div className="w-4/5 lg:w-2/5">
            <RangeSlider
              // eslint-disable-next-line
              aria-label={["min", "max"]}
              min={0}
              max={10}
              defaultValue={difficulty}
              onChange={(rating) => setDifficulty(rating)}
            >
              <RangeSliderTrack bg="#555">
                <RangeSliderFilledTrack bg="#B51C42" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </div>
        </Center>
      </Box>

      <Accordion
        allowToggle
        w="full"
        className="px-4 md:px-0"
        index={expandedIndex}
        onChange={(i: number) => setExpandedIndex(i)} // number | number[] only if allowMultiple
      >
        <Center>
          <VStack w="100%" spacing={4}>
            {(!!search || difficulty[0] !== 0 || difficulty[1] !== 10) && !result.length && (
              <p>No matching tabs found</p>
            )}
            {(!!search || difficulty[0] !== 0 || difficulty[1] !== 10 ? result : tabs).map(
              (tab: TabInfo, index: number) => (
                <TabItem
                  key={index}
                  tab={tab}
                  isDifficultyFilter={difficulty[0] !== 0 || difficulty[1] !== 10}
                />
              )
            )}
          </VStack>
        </Center>
      </Accordion>
    </Wrapper>
  );
};

export default Tabs;
