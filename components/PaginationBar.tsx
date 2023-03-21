import { Box, Flex, HStack, Input, Select } from "@chakra-ui/react";
import React from "react";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineVerticalLeft,
  AiOutlineVerticalRight,
} from "react-icons/ai";

const PButton = ({
  onClick,
  children,
  disabled = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <button
      className={
        "h-10 w-10 rounded-md flex justify-center items-center text-2xl " +
        (disabled
          ? "bg-grey-med"
          : "bg-carmine-soft hover:bg-carmine-hard transition ease-in duration-250")
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

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
    <HStack mt={mt} mb={mb} className="w-full justify-center">
      <HStack>
        <PButton onClick={() => onChange(0)} disabled={pagination <= 0}>
          <AiOutlineVerticalRight />
        </PButton>
        <PButton onClick={() => onChange(pagination - 1)} disabled={pagination <= 0}>
          <AiOutlineLeft />
        </PButton>
      </HStack>
      <Box w="4em" textAlign="center" px={2} className="text-xl font-medium">
        {pagination + 1} / {maxPage}
        {/* <Input mx="5px" width="1.75em" p="1" h="1.75em" textAlign="center" value={pagination + 1} /> */}
      </Box>
      <HStack>
        <PButton onClick={() => onChange(pagination + 1)} disabled={pagination + 1 >= maxPage}>
          <AiOutlineRight />
        </PButton>
        <PButton onClick={() => onChange(maxPage - 1)} disabled={pagination + 1 >= maxPage}>
          <AiOutlineVerticalLeft />
        </PButton>
      </HStack>
    </HStack>
  );
};

export default PaginationBar;
