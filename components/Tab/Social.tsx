import React from "react";
import { FaApple, FaSpotify, FaYoutube } from "react-icons/fa";
import prepLink from "../../utils/prepLink";
import GuitardexIcon from "../Icon/GuitardexIcon";

const Icon = ({
  type,
  className,
}: {
  type: "spotify" | "youtube" | "apple";
  className?: string;
}) => {
  switch (type) {
    case "spotify":
      return <FaSpotify className={className} size="1.8em" />;
    case "youtube":
      return <FaYoutube className={className} size="1.8em" />;
    case "apple":
      return <FaApple className={className} size="1.8em" />;
  }
};

const Social = ({
  link,
  type,
}: {
  link?: string;
  type: "spotify" | "youtube" | "gdex" | "apple";
}) => {
  if (type === "gdex") {
    return (
      <a href={prepLink(link)} onClick={(e) => e.stopPropagation()} target="_blank">
        <GuitardexIcon
          className={link ? "fill-white-soft hover:fill-gold" : "fill-grey-med cursor-default"}
        />
      </a>
    );
  }
  return (
    <a
      href={prepLink(link)}
      onClick={(e) => e.stopPropagation()}
      className="flex justify-center items-center"
      target="_blank"
    >
      <Icon
        type={type}
        className={link ? "text-white-soft hover:text-gold" : "text-grey-med cursor-default"}
      />
    </a>
  );
};

export default Social;
