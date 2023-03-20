import { Center } from "@chakra-ui/react";
import React from "react";

const Search = ({
  search,
  onChange,
}: {
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Center mb={4}>
      <input
        placeholder="Search song, artist, tuning, genre"
        className="border-gold border-px rounded-md py-3 px-4 bg-grey-hard w-72"
        value={search}
        onChange={onChange}
      />
    </Center>
  );
};

export default Search;
