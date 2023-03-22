import { Image } from "@chakra-ui/react";
import React from "react";

type DynaImageConfig = {
  prop: string;
};

const DynaImage = ({ prop }: DynaImageConfig) => {
  const logoSrc = "/img/logo/" + prop + ".svg";
  const fallbackSrc = "/img/logo/" + prop + ".png";
  const altText = "" + prop;
  return <Image alt={altText} src={logoSrc} fallbackSrc={fallbackSrc} className="w-32 h-10" />;
};
export default DynaImage;
