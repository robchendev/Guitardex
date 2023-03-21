import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import Wrapper from "../components/Wrapper";
import { tabCloneCache, tabsCache } from "../utils/tabsCache";
import TabMaster from "../components/TabMaster";

const Tabs: NextPage = () => {
  return (
    <Wrapper title="Tabs">
      <TabMaster tabs={tabCloneCache} tabsCache={tabsCache} />
    </Wrapper>
  );
};

export default Tabs;
