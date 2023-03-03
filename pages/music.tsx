import { Grid, GridItem, Image, Icon } from "@chakra-ui/react";
import { NextPage } from "next";
import { FaPlay } from "react-icons/fa";
import Wrapper from "../components/Wrapper";

export const Music: NextPage = () => {
  type MusicIcon = {
    name: string;
    link: string;
    picture: string;
  };

  const images: MusicIcon[] = [
    {
      name: "youtube",
      link: "https://open.spotify.com/track/5FXCk4Hu9jCcjOIhTozB6Y?si=64121cad3175468f",
      picture: "/img/music1.jpg",
    },
    {
      name: "youtube",
      link: "https://open.spotify.com/track/5FXCk4Hu9jCcjOIhTozB6Y?si=64121cad3175468f",
      picture: "/img/music2.jpg",
    },
    {
      name: "youtube",
      link: "",
      picture: "/img/music3.jpg",
    },
    {
      name: "youtube",
      link: "",
      picture: "/img/music4.jpg",
    },
    {
      name: "youtube",
      link: "",
      picture: "/img/music5.jpg",
    },
    {
      name: "youtube",
      link: "",
      picture: "/img/music6.jpg",
    },
    {
      name: "youtube",
      link: "",
      picture: "/img/music7.jpg",
    },
    {
      name: "youtube",
      link: "",
      picture: "/img/music8.jpg",
    },
  ];
  return (
    <>
      <Wrapper>
        pog
        <Grid templateColumns="repeat(4,1fr)" gap={6}>
          {images.map((image: MusicIcon, index: number) => (
            <GridItem key={index} className="b">
              <a href={image.link} className="absolute text-gray-50">
                <div className="absolute">
                  <Icon as={FaPlay} className="text-transparent"></Icon>
                  <span className="text-transparent">Listen</span>
                </div>
                <div className="absolute bg-black opacity-50 text-transparent hover:bg-rose-600 hover:opacity-50 w-full h-full">
                  <Icon as={FaPlay} className=""></Icon>
                  <span className="">Listen</span>
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
