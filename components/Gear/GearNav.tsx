import { VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GearItem } from "../../types/dynamic/gear";

export const items: GearItem[] = [
  {
    name: "Audio",
    id: "audio",
  },
  {
    name: "Video",
    id: "video",
  },
  {
    name: "Misc",
    id: "misc",
  },
];

const GearNav = () => {
  const router = useRouter();
  const queryId = router.query.id as string;

  return (
    <VStack alignItems="flex-start">
      {items.map(({ id, name }: GearItem) => (
        <Link
          href={id}
          key={id}
          className={
            (queryId === id ? "text-gold border-gold" : "border-transparent hover:text-gold") +
            " " +
            "border-l-2 pl-2 font-medium text-xl tracking-wide"
          }
        >
          {name}
        </Link>
      ))}
    </VStack>
  );
};

export default GearNav;
