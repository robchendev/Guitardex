import React, { useEffect } from "react";
import { Input, Icon, HStack } from "@chakra-ui/react";
import { Module } from "../../types/dynamic/common";
import { HiOutlineSearch } from "react-icons/hi";

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
      item.difficulty?.includes(search)
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
  console.log(list);

  return (
    <div className="mb-4 rounded-md border-2 border-greyChecked bg-bg">
      <HStack spacing={0}>
        <Icon as={HiOutlineSearch} className="ml-3 text-lg" />
        <Input
          variant="unstyled"
          py={2}
          px={3}
          border="none"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </HStack>
    </div>
  );
};

export default SearchBar;
