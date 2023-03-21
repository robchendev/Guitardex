import { Link } from "@chakra-ui/react";
import React from "react";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import prepLink from "../../utils/prepLink";
import GuitardexIcon from "../Icon/GuitardexIcon";

const Icon = ({ type, className }: { type: "spotify" | "youtube"; className?: string }) => {
  switch (type) {
    case "spotify":
      return <FaSpotify className={className} size="1.8em" />;
    case "youtube":
      return <FaYoutube className={className} size="1.8em" />;
  }
};

const Social = ({ link, type }: { link?: string; type: "spotify" | "youtube" | "gdex" }) => {
  if (type === "gdex") {
    return (
      <Link href={prepLink(link)} isExternal onClick={(e) => e.stopPropagation()}>
        <GuitardexIcon
          className={link ? "fill-white-soft hover:fill-gold" : "fill-grey-med cursor-default"}
        />
      </Link>
    );
  }
  return (
    <Link
      href={prepLink(link)}
      isExternal
      onClick={(e) => e.stopPropagation()}
      className="flex justify-center items-center"
    >
      <Icon
        type={type}
        className={link ? "text-white-soft hover:text-gold" : "text-grey-med cursor-default"}
      />
    </Link>
  );
};

export default Social;
