import { GridItem, Image, Icon } from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { MusicIcon } from "../config/config";

const MusicRelease = ({ image }: { image: MusicIcon }) => {
  return (
    <GridItem className="flex flex-wrap relative  border-2 border-gold">
      <a href={image.link} className="absolute top-2 left-2  text-white-soft">
        <div className="bg-black-hard bg-opacity-50 rounded text-transparent align-middle hover:bg-carmine-soft hover:bg-opacity-100 py-0.5 px-2.5 w-full h-full">
          <Icon as={FaPlay} color="white" />
          <span className="text-white-hard pl-1">Listen</span>
        </div>
      </a>
      <Image src={image.picture} alt={image.name} className=""></Image>
    </GridItem>
  );
};

export default MusicRelease;
