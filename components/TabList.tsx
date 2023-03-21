import {
  Accordion,
  Box,
  Button,
  HStack,
  Input,
  Slide,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { TabInfo } from "../types/tabs";
import PaginationBar from "./PaginationBar";
import TabItem from "./TabItem";

const TabList = ({
  expandedIndex,
  onChange,
  search,
  min,
  max,
  searchResults,
  tabs,
  pagination,
  setPagination,
}: {
  expandedIndex: number;
  onChange: (i: number) => void;
  search: string;
  min: number;
  max: number;
  searchResults: number[];
  tabs: TabInfo[];
  pagination: number;
  setPagination: (page: number) => void;
}) => {
  const showSearchResults = !(!search && min === 0 && max === 10);
  const noMatch = showSearchResults && !searchResults.length;
  const isDifficultyFilter = !(min === 0 && max === 10);
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Accordion
        allowToggle
        w="full"
        className="px-4 md:px-0"
        index={expandedIndex}
        onChange={onChange}
      >
        {/* <PaginationBar
          pagination={pagination}
          onChange={(page: number) => setPagination(page)}
          maxPage={Math.ceil(tabs.length / 10)}
          mb={3}
        /> */}
        <div className="w-full flex flex-col content-between space-y-3">
          {noMatch && <p>No matching tabs found</p>}
          {showSearchResults ? (
            <>
              {searchResults
                .slice(10 * pagination, 10 * (pagination + 1))
                .map((matchingIndex: number) => (
                  <TabItem
                    key={matchingIndex}
                    tab={tabs[matchingIndex]}
                    isDifficultyFilter={isDifficultyFilter}
                  />
                ))}
            </>
          ) : (
            <>
              {tabs
                .slice(10 * pagination, 10 * (pagination + 1))
                .map((tab: TabInfo, index: number) => (
                  <TabItem key={index} tab={tab} isDifficultyFilter={isDifficultyFilter} />
                ))}
            </>
          )}
        </div>
      </Accordion>
      {/* Idea: let user set pagination to 5, 10, 15, 20 and store pref in localstorage */}
      {/* Idea: show search bar on bottom of page on the same fixed block as pagination
          --> initially a button that slides open a search input when clicked */}
      <div className="h-20"></div>
      <div className="fixed bottom-0 left-0 right-0 bg-grey-ghost h-20 flex items-center">
        <div className="lg:max-w-4xl lg:mx-auto w-full">
          <PaginationBar
            pagination={pagination}
            onChange={(page: number) => setPagination(page)}
            maxPage={Math.ceil(tabs.length / 10)}
          />
        </div>
      </div>
    </>
  );
};

export default TabList;
