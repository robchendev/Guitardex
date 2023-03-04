/* eslint-disable prettier/prettier */
import { GridItem, Image, Icon } from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { MusicIcon } from "../config/config";

const MusicRelease = ({ image }: { image: MusicIcon }) => {
  return (
    <GridItem className="flex flex-wrap relative  border-2 border-amber-200 ">
      <a href={image.link} className="absolute top-2 left-2  text-gray-50">
        <div className="bg-black bg-opacity-50 rounded text-transparent align-middle hover:bg-rose-600 hover:bg-opacity-100 py-0.5 px-2.5 w-full h-full">
          <Icon as={FaPlay} color="white" />
          <span className="text-white pl-1">Listen</span>
        </div>
      </a>
      <Image src={image.picture} alt={image.name} className=""></Image>
    </GridItem>
  );
};

export default MusicRelease;
