import { Accordion } from "@chakra-ui/react";
import React from "react";
import { TabInfo } from "../types/tabs";
import PaginationBar from "./PaginationBar";
import TabItem from "./TabItem";

const TabList = ({
  expandedIndex,
  setExpandedIndex,
  onChange,
  searchResults,
  tabs,
  pagination,
  setPagination,
  showSearchResults,
  isDifficultyFilter,
}: {
  expandedIndex: number;
  setExpandedIndex: (i: number) => void;
  onChange: (i: number) => void;
  searchResults: number[];
  tabs: TabInfo[];
  pagination: number;
  setPagination: (page: number) => void;
  showSearchResults: boolean;
  isDifficultyFilter: boolean;
}) => {
  const noMatch = showSearchResults && !searchResults.length;
  const tabsPerPage = 10;
  return (
    <>
      <Accordion allowToggle w="full" index={expandedIndex} onChange={onChange}>
        <div className="w-full flex flex-col content-between space-y-3">
          {noMatch && <p className="text-center">No matching tabs found</p>}
          {showSearchResults ? (
            <>
              {searchResults
                .slice(tabsPerPage * pagination, tabsPerPage * (pagination + 1))
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
                .slice(tabsPerPage * pagination, tabsPerPage * (pagination + 1))
                .map((tab: TabInfo, index: number) => (
                  <TabItem key={index} tab={tab} isDifficultyFilter={isDifficultyFilter} />
                ))}
            </>
          )}
        </div>
      </Accordion>
      <div className="fixed bottom-0 left-0 right-0 bg-grey-ghost h-16 lg:h-20 flex items-center">
        <div className="lg:max-w-4xl lg:mx-auto w-full">
          <PaginationBar
            pagination={pagination}
            onChange={(page: number) => {
              setPagination(page);
              setExpandedIndex(-1);
            }}
            maxPage={
              searchResults
                ? Math.ceil(searchResults.length / tabsPerPage)
                : Math.ceil(tabs.length / tabsPerPage)
            }
          />
        </div>
      </div>
    </>
  );
};

export default TabList;
