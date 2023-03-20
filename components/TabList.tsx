import { Accordion, Center, VStack } from "@chakra-ui/react";
import React from "react";
import { tabs } from "../config/tabs";
import { TabInfo } from "../types/tabs";
import TabItem from "./TabItem";

const TabList = ({
  expandedIndex,
  onChange,
  search,
  min,
  max,
  searchResults,
}: {
  expandedIndex: number;
  onChange: (i: number) => void;
  search: string;
  min: number;
  max: number;
  searchResults: TabInfo[];
}) => {
  const showSearchResults = !(!search && min === 0 && max === 10);
  const noMatch = showSearchResults && !searchResults.length;

  return (
    <Accordion
      allowToggle
      w="full"
      className="px-4 md:px-0"
      index={expandedIndex}
      onChange={onChange}
    >
      <Center>
        <VStack w="100%" spacing={4}>
          {noMatch && <p>No matching tabs found</p>}
          {(showSearchResults ? searchResults : tabs).map((tab: TabInfo, index: number) => (
            <TabItem key={index} tab={tab} isDifficultyFilter={!(min === 0 && max === 10)} />
          ))}
        </VStack>
      </Center>
    </Accordion>
  );
};

export default TabList;
