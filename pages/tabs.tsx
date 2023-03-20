import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { tabs } from "../config/tabs";
import { Difficulty, TabInfo } from "../types/tabs";
import DifficultySlider from "../components/Tab/DifficultySlider";
import { Tab } from "../components/Tab/_index";
import TabList from "../components/TabList";

const Tabs: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState<TabInfo[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [difficulty, setDifficulty] = useState<[Difficulty, Difficulty]>([0, 10]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
    setResult(newResult);
  }, [search, difficulty]);

  return (
    <Wrapper title="Tabs">
      <Tab.Search search={search} onChange={onSearch} />
      <DifficultySlider
        min={difficulty[0]}
        max={difficulty[1]}
        onChange={(rating) => {
          setDifficulty(rating);
          setExpandedIndex(-1);
        }}
      />
      <TabList
        expandedIndex={expandedIndex}
        onChange={(i: number) => setExpandedIndex(i)}
        search={search}
        min={difficulty[0]}
        max={difficulty[1]}
        searchResults={result}
      />
    </Wrapper>
  );
};

export default Tabs;
