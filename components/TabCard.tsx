import { AccordionButton, HStack } from "@chakra-ui/react";
import React from "react";
import { TabInfo } from "../types/tabs";
import { Tab } from "./Tab/_index";
import Truncate from "./Truncate";

const TabCard = ({ tab, isDifficultyFilter }: { tab: TabInfo; isDifficultyFilter: boolean }) => {
  return (
    <AccordionButton
      className="w-full rounded-md"
      _hover={{
        bg: "linear-gradient(60deg, transparent 0%, #303030 100%)",
      }}
      _expanded={{
        borderRadius: "8px 8px 0px 0px",
      }}
    >
      <div className="w-full md:w-2/5 pr-8 text-left">
        <Truncate className="font-medium text-gold">{tab.title}</Truncate>
        <Truncate>{tab.source || tab.artist}</Truncate>
        {isDifficultyFilter && <Tab.Difficulty rating={tab.difficulty} hasNum />}
      </div>
      <div className="hidden md:block w-3/5 text-center">
        <HStack spacing={0}>
          <p className="w-3/12 text-lg tracking-tight whitespace-pre leading-6">
            {tab.tuning && tab.tuning.strings}
          </p>
          <p className="w-3/12">{tab.genre}</p>
          <div className="w-3/12">{tab.button && <Tab.Button button={tab.button} />}</div>
          <div className="w-3/12">
            <HStack justifyContent="flex-end" spacing={2}>
              <Tab.Social link={tab.guitardex} type="gdex" />
              <Tab.Social link={tab.spotify} type="spotify" />
              <Tab.Social link={tab.youtube} type="youtube" />
            </HStack>
          </div>
        </HStack>
      </div>
    </AccordionButton>
  );
};

export default TabCard;
