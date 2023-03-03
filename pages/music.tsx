/* eslint-disable prettier/prettier */
import { Grid, GridItem, Image, Icon } from "@chakra-ui/react";
import { NextPage } from "next";
import { FaPlay } from "react-icons/fa";
import Wrapper from "../components/Wrapper";
import { images, MusicIcon } from "../config/config";

export const Music: NextPage = () => {
  return (
    <>
      <Wrapper>
        <h1 className="font-serif md:w-8/12 font-weight:900 text-4xl text-center mx-auto my-7">
          releases produced
        </h1>
        <Grid
          templateColumns="repeat(4,1fr)"
          gap={6}
          className="lg:max-w-4xl  lg:mx-auto mb-16"
        >
          {images.map((image: MusicIcon, index: number) => (
            <GridItem
              key={index}
              className="flex flex-wrap relative  border-2 border-amber-200 "
            >
              <a
                href={image.link}
                className="absolute top-2 left-2  text-gray-50"
              >
                <div className="bg-black bg-opacity-50 rounded text-transparent align-middle hover:bg-rose-600 hover:bg-opacity-100 py-0.5 px-2.5 w-full h-full">
                  <Icon as={FaPlay} color="white" />
                  <span className="text-white pl-1">Listen</span>
                </div>
              </a>
              <Image src={image.picture} alt={image.name} className=""></Image>
            </GridItem>
          ))}
        </Grid>
      </Wrapper>
    </>
  );
};

export default Music;
