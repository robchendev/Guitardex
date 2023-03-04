/* eslint-disable prettier/prettier */
import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import { GuitarInfo } from "../config/config";

type ItemComponent = {
  available: "buy" | "discontinued";
  buyLink?: string;
  price?: string;
};

const BuyButton = ({ item }: { item: ItemComponent }) => {
  switch (item.available) {
    case "buy":
      return (
        <span className="inline-block align-middle">
          <span className="w-max text-4xl p-6">${item.price}</span>
          <a
            href={item.buyLink}
            className="bg-carmine-soft w-max text-xl p-2 rounded-md"
          >
            Buy this guitar
          </a>
        </span>
      );
    case "discontinued":
      return (
        <a
          href={item.buyLink}
          className="bg-grey-soft w-max text-2xl p-2 rounded-md"
        >
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
      className="max-w-5xl flex flex-row end text-right justify-items-end mb-16"
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
          <h2 className="text-4xl">{guitar.name}</h2>
          <span className=" text-gold">{guitar.brand}</span>
        </div>
        <Text className="text-xl pl-10">{guitar.desc}</Text>

        <BuyButton key={index} item={guitar}></BuyButton>
      </div>
    </div>
  );
};

export default GuitarCard;
