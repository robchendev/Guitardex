import { HStack } from "@chakra-ui/react";
import React from "react";

const PaginationBar = ({
  pagination,
  onChange,
  maxPage,
  mt = 0,
  mb = 0,
}: {
  pagination: number;
  onChange: (page: number) => void;
  maxPage: number;
  mt?: number;
  mb?: number;
}) => {
  return (
    <HStack
      mt={mt}
      mb={mb}
      className="w-full justify-center [&>button]:bg-carmine-soft [&>button]:py-1 [&>button]:px-3"
    >
      <button onClick={() => onChange(pagination - 1)}>{"<<"}</button>
      <button onClick={() => onChange(0)}>{1}</button>
      <button>...</button>
      <button onClick={() => onChange(pagination - 1)}>{pagination}</button>
      <button>{pagination + 1}</button>
      <button onClick={() => onChange(pagination + 1)}>{pagination + 2}</button>
      <button>...</button>
      <button onClick={() => onChange(maxPage - 1)}>{maxPage}</button>
      <button onClick={() => onChange(pagination + 1)}>{">>"}</button>
    </HStack>
  );
};

export default PaginationBar;
