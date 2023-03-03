import React from "react";
import { IconType } from "react-icons";
import { Icon } from "@chakra-ui/react";

const LinkIcon = ({ icon, link }: { icon: IconType; link: string }) => (
  <a href={link}>
    <Icon as={icon} className="m-0.5" color="white" _hover={{ color: "#fcdc97" }} />
  </a>
);

export default LinkIcon;
