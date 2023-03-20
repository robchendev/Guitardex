import React, { useEffect, useState } from "react";
import { TabsCache, tabsCacheSize } from "../utils/tabsCache";
import { Difficulty, TabInfo } from "../types/tabs";
import DifficultySlider from "../components/Tab/DifficultySlider";
import { Tab } from "../components/Tab/_index";
import TabList from "../components/TabList";

const TabMaster = ({ tabs, tabsCache }: { tabs: TabInfo[]; tabsCache: TabsCache[] }) => {
  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState<number[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [difficulty, setDifficulty] = useState<[Difficulty, Difficulty]>([0, 10]);
  const [pagination, setPagination] = useState(0);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setExpandedIndex(-1);
    setPagination(0);
  };

  const onPaginateClick = (page: number) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setPagination(page);
  };

  useEffect(() => {
    const matchingIndices: number[] = [];
    const keywords = search.toLowerCase();
    const noSpaceKeywords = keywords.replace(/\s/g, "");
    for (let i = 0; i < tabsCacheSize; i++) {
      const { diff, title, source, artist, genre, tuning, strings } = tabsCache[i];
      if (diff >= difficulty[0] && diff <= difficulty[1]) {
        if (
          // For some reason, indexOf() is faster than includes()
          !keywords ||
          title.indexOf(keywords) !== -1 ||
          (source && source.indexOf(keywords) !== -1) ||
          (artist && artist.indexOf(keywords) !== -1) ||
          genre.indexOf(keywords) !== -1 ||
          (strings && strings.indexOf(noSpaceKeywords) !== -1) ||
          (tuning && tuning.indexOf(tuning))
        ) {
          matchingIndices.push(i);
        }
      }
    }
    setResult(matchingIndices);
  }, [search, difficulty, tabsCache]);

  return (
    <>
      <Tab.Search search={search} onChange={onSearch} />
      <DifficultySlider
        min={difficulty[0]}
        max={difficulty[1]}
        onChange={(rating) => {
          setDifficulty(rating);
          setExpandedIndex(-1);
          setPagination(0);
        }}
      />
      <TabList
        expandedIndex={expandedIndex}
        onChange={(i: number) => setExpandedIndex(i)}
        search={search}
        min={difficulty[0]}
        max={difficulty[1]}
        searchResults={result}
        tabs={tabs}
        pagination={pagination}
        setPagination={onPaginateClick}
      />
    </>
  );
};

export default TabMaster;
