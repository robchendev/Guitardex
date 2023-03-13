import { Text } from "@chakra-ui/react";
import React from "react";
import { Gear, Section, GearLink } from "../../config/gear";

const Links = ({ links }: { links: GearLink[] }) => (
  <>
    {links?.map(({ seller, link }: GearLink, index: number) => (
      <span key={index}>
        {index ? ", " : ""}
        <a className="text-gold" href={link}>
          {seller}
        </a>
      </span>
    ))}
  </>
);

const Gear = ({ gear }: { gear: Gear[] }) => (
  <div className="ml-4">
    {gear?.map(({ name, links }: Gear, index: number) => (
      <Text key={index}>
        {name} <Links links={links} />
      </Text>
    ))}
  </div>
);

const GearCard = ({ sections }: { sections: Section[] }) => (
  <div>
    {sections?.map(({ name, gear }: Section, index: number) => (
      <div key={index}>
        <Text>{name}</Text>
        <Gear gear={gear} />
      </div>
    ))}
  </div>
);

export default GearCard;
