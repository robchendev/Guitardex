import { Grid } from "@chakra-ui/react";
import { NextPage } from "next";
import MusicRelease from "../components/MusicRelease";
import Wrapper from "../components/Wrapper";
import { images, MusicIcon } from "../config/config";

export const Music: NextPage = () => {
  return (
    <Wrapper title="releases produced">
      <Grid
        templateColumns={{ sm: "repeat(2,1fr)", md: "repeat(3,1fr)", lg: "repeat(4,1fr)" }}
        gap={{ sm: "4", lg: "6" }}
        className="mb-16 sm:mx-10 lg:mx-autogi flex align-items-center"
      >
        {images.map((image: MusicIcon, index: number) => (
          <MusicRelease key={index} image={image} />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Music;
