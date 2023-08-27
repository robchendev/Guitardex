import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineBookOpen } from "react-icons/hi";
import { GlossaryItem } from "../../types";

const Glossary = ({ glossary }: { glossary: GlossaryItem[] }) => {
  return (
    <Accordion allowToggle className="rounded-lg mb-4">
      <AccordionItem
        borderRadius={8}
        className="bg-bg hover:bg-bg  border-none"
        isDisabled={!glossary.length}
      >
        <AccordionButton className="bg-bg" borderRadius={8}>
          <HiOutlineBookOpen className="mr-2" />
          Glossary [{glossary.length}]
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          borderBottomRadius={8}
          pb={2.5}
          className="bg-bg hover:bg-bg border-t-2 border-grey"
        >
          {glossary.length ? (
            <ul>
              {glossary.map((item: GlossaryItem, index: number) => (
                <li key={index} className="leading-5 mb-1 last:mb-0">
                  <span className="font-medium underline underline-offset-2">{item.term}</span>:{" "}
                  {item.definition}
                </li>
              ))}
            </ul>
          ) : (
            <div>N/A</div>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Glossary;
