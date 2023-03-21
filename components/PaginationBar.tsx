import {
  Flex,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
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
      className="w-full justify-center [&>button]:bg-grey-med [&>button]:py-1 [&>button]:px-3"
    >
      <button onClick={() => onChange(0)}>{"|<"}</button>
      <button onClick={() => onChange(pagination - 1)}>{"<"}</button>
      <Flex>
        Page
        <Input width="2em" p="1" h="2em" value={pagination + 1} />
        of {maxPage}
      </Flex>
      <button onClick={() => onChange(pagination + 1)}>{">"}</button>
      <button onClick={() => onChange(maxPage - 1)}>{">|"}</button>
    </HStack>
  );
};

export default PaginationBar;
