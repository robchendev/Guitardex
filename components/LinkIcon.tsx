import React from "react";
import { IconType } from "react-icons";
import { Icon } from "@chakra-ui/react";

const LinkIcon = ({ icon, link }: { icon: IconType; link: string }) => (
  <a href={link}>
    <Icon
      as={icon}
      className="sm:mx-4 sm:text-4xl lg:m-0.5 lg:text-xl"
      color="white"
      _hover={{ color: "#fcdc97" }}
    />
  </a>
);

export default LinkIcon;
