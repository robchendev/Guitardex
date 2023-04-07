import React, { useEffect, useState } from "react";
import { TabsCache, tabsCacheSize } from "../utils/tabsCache";
import { Difficulty, TabInfo } from "../types/tabs";
import DifficultySlider from "../components/Tab/DifficultySlider";
import { Tab } from "../components/Tab/_index";
import TabList from "../components/TabList";
import { Container, HStack } from "@chakra-ui/react";

const TabNavButton = ({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    className={
      (isActive ? "text-gold border-gold" : "border-transparent hover:text-gold") +
      " " +
      "border-b-2 pb-1 font-medium text-xl tracking-wide"
    }
    onClick={onClick}
  >
    {children}
  </button>
);

const TabMaster = ({ tabs, tabsCache }: { tabs: TabInfo[]; tabsCache: TabsCache[] }) => {
  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState<number[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [difficulty, setDifficulty] = useState<[Difficulty, Difficulty]>([0, 10]);
  const [pagination, setPagination] = useState(0);
  const SHOW_ALL = 0;
  const SHOW_ANIME = 1;
  const SHOW_OTHER = 2;
  const [genre, setGenre] = useState<number>(SHOW_ALL);

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
      const { diff, title, source, artist, isAnime, tuning, strings } = tabsCache[i];
      if (diff >= difficulty[0] && diff <= difficulty[1]) {
        if (genre !== SHOW_ALL && genre !== SHOW_ANIME && isAnime) {
          continue;
        }
        if (genre !== SHOW_ALL && genre !== SHOW_OTHER && !isAnime) {
          continue;
        }
        if (
          !keywords ||
          title.indexOf(keywords) !== -1 ||
          (source && source.indexOf(keywords) !== -1) ||
          (artist && artist.indexOf(keywords) !== -1) ||
          (tuning && tuning.indexOf(keywords) !== -1) ||
          (strings && strings.indexOf(noSpaceKeywords) !== -1)
        ) {
          matchingIndices.push(i);
        }
      } else {
        console.log("does not match diff");
      }
    }
    console.log(matchingIndices);
    setResult(matchingIndices);
    setExpandedIndex(-1);
    setPagination(0);
  }, [search, difficulty, tabsCache, genre]);

  console.log(result.length);

  return (
    <Container maxW={["100%", "80%"]} p={0}>
      <Tab.Search search={search} onChange={(e) => setSearch(e.target.value)} />
      <DifficultySlider
        min={difficulty[0]}
        max={difficulty[1]}
        onChange={(rating) => {
          setDifficulty(rating);
          setExpandedIndex(-1);
          setPagination(0);
        }}
      />
      <HStack justifyContent="center" mb={4} spacing={5}>
        <TabNavButton isActive={genre === 0} onClick={() => setGenre(0)}>
          All
        </TabNavButton>
        <TabNavButton isActive={genre === 1} onClick={() => setGenre(1)}>
          Anime
        </TabNavButton>
        <TabNavButton isActive={genre === 2} onClick={() => setGenre(2)}>
          Non-Anime
        </TabNavButton>
      </HStack>
      <TabList
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
        onChange={(i: number) => setExpandedIndex(i)}
        showSearchResults={!!search || result.length !== tabs.length}
        isDifficultyFilter={!(difficulty[0] === 0 && difficulty[1] === 10)}
        searchResults={result}
        tabs={tabs}
        pagination={pagination}
        setPagination={onPaginateClick}
      />
    </Container>
  );
};

export default TabMaster;
