import { AccordionItem } from "@chakra-ui/react";
import React from "react";
import { TabInfo } from "../types/tabs";
import TabCard from "./TabCard";
import TabDetails from "./TabDetails";

const TabItem = ({
  tab,
  isDifficultyFilter = false,
}: {
  tab: TabInfo;
  isDifficultyFilter?: boolean;
}) => {
  return (
    <AccordionItem mb="0">
      <TabCard tab={tab} isDifficultyFilter={isDifficultyFilter} />
      <TabDetails tab={tab} />
    </AccordionItem>
  );
};

export default TabItem;
