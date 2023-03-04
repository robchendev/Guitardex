/* eslint-disable prettier/prettier */
import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import { GuitarInfo } from "../config/config";

type ItemComponent = {
  available: "buy" | "discontinued";
  buyLink?: string;
  price?: string;
};

const Component = ({ item }: { item: ItemComponent }) => {
  switch (item.available) {
    case "buy":
      return (
        <a href={item.buyLink} className="bg-rose-600 w-max text-2xl ">
          Buy this for ${item.price}
        </a>
      );
    case "discontinued":
      return (
        <a href={item.buyLink} className="bg-gray-500 w-max text-2xl ">
          Discontinued
        </a>
      );
  }
};

const GuitarCard = ({
  index,
  guitar,
}: {
  index: number;
  guitar: GuitarInfo;
}) => {
  return (
    <div
      key={index}
      className="max-w-4xl flex flex-row end text-right justify-items-end "
    >
      <iframe
        width="450"
        height="253"
        src={guitar.link}
        title={guitar.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="max-w-1/2 rounded-xl"
      ></iframe>
      <div className="flex flex-col w-1/2 items-end justify-between">
        <div>
          <Heading as="h2">{guitar.name}</Heading>
          <span className=" text-amber-200">{guitar.brand}</span>
        </div>
        <Text>{guitar.desc}</Text>

        <Component key={index} item={guitar}></Component>
      </div>
    </div>
  );
};

export default GuitarCard;
