import { Text } from "@chakra-ui/react";
import React from "react";
import { Gear, Section, GearLink } from "../../config/gear";

const Links = ({ links }: { links?: GearLink[] }) => (
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

const Gear = ({ gear }: { gear?: Gear[] }) => (
  <ul className="ml-2">
    {gear?.map(({ name, links }: Gear, index: number) => (
      <li className="text-lg" key={index}>
        • {name} <Links links={links} />
      </li>
    ))}
  </ul>
);

const GearCard = ({ sections }: { sections?: Section[] }) => (
  <div>
    {sections?.map(({ name, gear }: Section, index: number) => (
      <div key={index} className="mb-4 last:mb-0">
        <Text mb="1" fontWeight={500} fontSize="xl" letterSpacing={0.3}>
          {name}
        </Text>
        <Gear gear={gear} />
      </div>
    ))}
  </div>
);

export default GearCard;
