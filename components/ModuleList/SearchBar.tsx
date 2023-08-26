import React, { useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { Module } from "../../types/dynamic/common";

const runFilter = (list: Module[], search: string): Module[] => {
  if (search === "") {
    return list;
  }
  const filter: Module[] = [];
  for (const item of list) {
    let pendingItem: Module | undefined;
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
  list: Module[];
  search: string;
  setFilter: (newFilter: Module[]) => void;
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
