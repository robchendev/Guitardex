import { HStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { Credit, CreditLink } from "../config/credits";
import { Icon } from "@chakra-ui/react";

const MainCredit = ({ credit }: { credit: Credit }) => {
  return (
    <div className="bg-bg-light rounded-lg">
      <HStack>
        <Image
          alt={credit.name}
          src={credit.img}
          width={120}
          height={120}
          className="rounded-l-md mr-2"
        />
        <div>
          <p className="text-lg font-medium">{credit.name}</p>
          <div>{credit.roles}</div>
          <HStack className="mt-1.5">
            {credit.links.map((link: CreditLink, index: number) => (
              <a key={index} href={link.url} className="text-text-light hover:text-purple">
                <Icon as={link.icon} className="text-3xl" />
              </a>
            ))}
          </HStack>
        </div>
      </HStack>
    </div>
  );
};

export default MainCredit;
