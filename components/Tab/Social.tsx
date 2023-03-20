import { IconButton, Link } from "@chakra-ui/react";
import React from "react";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import GuitardexIcon from "../Icon/GuitardexIcon";

const Icon = (type: "spotify" | "youtube") => {
  switch (type) {
    case "spotify":
      return FaSpotify;
    case "youtube":
      return FaYoutube;
  }
};

const Social = ({ link, type }: { link?: string; type: "spotify" | "youtube" | "gdex" }) => {
  if (type === "gdex") {
    return (
      <Link href={link} isExternal onClick={(e) => e.stopPropagation()}>
        <GuitardexIcon
          className={link ? "fill-white-soft hover:fill-gold" : "fill-grey-med cursor-default"}
        />
      </Link>
    );
  }
  return (
    <Link href={link} isExternal>
      <IconButton
        onClick={(e) => e.stopPropagation()}
        as={Icon(type)}
        aria-label={type}
        bgColor="transparent"
        _hover={{ bgColor: "transparent" }}
        className={link ? "text-white-soft hover:text-gold" : "text-grey-med cursor-default"}
        size="sm"
        disabled={!link}
      />
    </Link>
  );
};

export default Social;
