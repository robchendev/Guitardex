import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineLightBulb } from "react-icons/hi";

const InsightItem = ({ title, text }: { title: string; text: string }) => {
  return (
    <span>
      <Accordion allowToggle className="rounded-lg mt-2 mb-4">
        <AccordionItem borderRadius={8} className="bg-bg hover:bg-bg  border-none">
          <AccordionButton className="bg-bg" borderRadius={8}>
            <HiOutlineLightBulb className="mr-2" />
            <Text noOfLines={1}>{title}</Text>
            <AccordionIcon ml={1} />
          </AccordionButton>
          <AccordionPanel
            borderBottomRadius={8}
            pb={2.5}
            className="bg-bg hover:bg-bg border-t-2 border-grey"
          >
            {text}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </span>
  );
};

export default InsightItem;
