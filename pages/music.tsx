import { Grid } from "@chakra-ui/react";
import { NextPage } from "next";
import MusicRelease from "../components/MusicRelease";
import Wrapper from "../components/Wrapper";
import { images, MusicIcon } from "../config/config";

export const Music: NextPage = () => {
  return (
    <Wrapper title="releases produced">
      <Grid templateColumns="repeat(4,1fr)" gap={6} className="mb-16">
        {images.map((image: MusicIcon, index: number) => (
          <MusicRelease key={index} image={image} />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Music;
