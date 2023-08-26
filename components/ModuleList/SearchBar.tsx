import React, { useEffect } from "react";
import { AudioProduction } from "../../types/dynamic/audio";
import { Technique } from "../../types/dynamic/techniques";
import { Input } from "@chakra-ui/react";

const runFilter = (
  list: Technique[] | AudioProduction[],
  search: string
): Technique[] | AudioProduction[] => {
  if (search === "") {
    return list;
  }
  const filter: Technique[] | AudioProduction[] = [];
  for (const item of list) {
    let pendingItem: Technique | undefined;
    if (
      item.name.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      item.difficulty.includes(search)
    ) {
      filter.push(item);
    }
    if (pendingItem) {
      filter.push(pendingItem);
    }
  }
  return filter;
};

const SearchBar = ({
  list,
  search,
  setFilter,
  setSearch,
}: {
  list: Technique[] | AudioProduction[];
  search: string;
  setFilter: (newFilter: Technique[] | AudioProduction[]) => void;
  setSearch: (newString: string) => void;
}) => {
  useEffect(() => {
    const filter = runFilter(list, search.toLowerCase());
    setFilter(filter);
  }, [search]);

  return (
    <Input
      className="mb-4"
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;
