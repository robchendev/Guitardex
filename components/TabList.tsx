import { Accordion } from "@chakra-ui/react";
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

  return (
    <>
      <Accordion
        allowToggle
        w="full"
        className="px-4 md:px-0"
        index={expandedIndex}
        onChange={onChange}
      >
        <PaginationBar
          pagination={pagination}
          onChange={(page: number) => setPagination(page)}
          maxPage={Math.ceil(tabs.length / 10)}
          mb={3}
        />
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
      <PaginationBar
        pagination={pagination}
        onChange={(page: number) => setPagination(page)}
        maxPage={Math.ceil(tabs.length / 10)}
        mt={3}
      />
    </>
  );
};

export default TabList;
