import React from "react";
import { IconType } from "react-icons";
import { Icon } from "@chakra-ui/react";

const LinkIcon = ({ icon, link }: { icon: IconType; link: string }) => (
  <a href={link}>
    <Icon
      as={icon}
      size="lg"
      className="mx-1 text-3xl"
      color="white"
      _hover={{ color: "#fcdc97" }}
    />
  </a>
);

export default LinkIcon;
