import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Library, Module, ModuleFrontMatter } from "../../types/dynamic/common";
import Wrapper from "../Wrapper";
import ModuleItem from "./ModuleItem";
import SearchBar from "./SearchBar";

const ModuleMasterList = ({
  title,
  moduleList,
  library,
}: {
  title: string;
  moduleList: Module[];
  library: Library;
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(moduleList);
  return (
    <Wrapper title={title}>
      <SearchBar
        list={moduleList}
        search={search}
        setFilter={(newFilter: Module[]) => setFilter(newFilter)}
        setSearch={setSearch}
      />
      <VStack w="full" spacing={1.5}>
        {filter.map((item: ModuleFrontMatter, index: number) => (
          <ModuleItem key={index} module={item} library={library} />
        ))}
      </VStack>
    </Wrapper>
  );
};

export default ModuleMasterList;
