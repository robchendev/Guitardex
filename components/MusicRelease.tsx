import { GridItem, Image, Icon } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { MusicIcon } from "../config/config";

const MusicRelease = ({ image }: { image: MusicIcon }) => {
  return (
    <GridItem className="flex max-w-max mx-auto relative border-2 border-gold">
      <Link href={image.link} className="absolute top-2.5 left-2  text-white-soft">
        <div className="bg-black-hard bg-opacity-50 rounded text-transparent align-middle hover:bg-carmine-soft hover:bg-opacity-100 py-0.5 pb-1 px-2.5 w-full h-full">
          <Icon as={FaPlay} color="white" className="sm:text-2xl lg:text-lg" />
          <span className="text-white-hard align-middle pl-1 sm:text-3xl md:text-2xl lg:text-lg">
            Listen
          </span>
        </div>
      </Link>
      <Image src={image.picture} alt={image.name} className=""></Image>
    </GridItem>
  );
};

export default MusicRelease;
