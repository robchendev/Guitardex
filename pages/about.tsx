import { VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import ExternalCredit from "../components/ExternalCredit";
import MainCredit from "../components/MainCredit";
import { ILiteYouTubeEmbedProps } from "../components/ModulePage/YoutubePlayer";
import A from "../components/Typography/A";
import H3 from "../components/Typography/H3";
import P from "../components/Typography/P";
import Wrapper from "../components/Wrapper";
import { Credit, mainCredits } from "../config/credits";
export const LiteYoutubeEmbed = dynamic<ILiteYouTubeEmbedProps>(
  () => import("react-lite-yt-embed").then((module) => module.LiteYoutubeEmbed),
  {
    ssr: false,
  }
);

const About = () => {
  return (
    <Wrapper title="About">
      <div className="w-full [&>div]:rounded-lg mb-6">
        <LiteYoutubeEmbed
          id="ef2ZcJt0EaU"
          isMobile={true}
          mute={false}
          desktopResolution="maxresdefault"
          mobileResolution="maxresdefault"
          params={{ rel: "0" }}
        />
      </div>
      <H3 text="Why Guitardex Was Made" />
      <P text="Fingerstyle is a young style of guitar rising in popularity. Due to its infancy in history, it is not an officially recognized style of guitar by most music conservatories and is not documented heavily on. As a consequence, many avid learners of the style teach themselves without guidance." />
      <P text="My name is Robert Chen, and I created Guitardex to provide easy and free access to fingerstyle tutorials and information. As someone who had experienced the lack of freely accessible resources while growing my own skills as a fingerstyle guitarist, I want this site to give guitarists a convenient access to fingerstyle information." />
      <P text="Brought to you by members of the University of Victoria's Guitar Club and Fingerstyle Central, Guitardex aims to provide concise tutorials to elevate any learner's fingerstyle skills to the next level." />
      <H3 text="Open Source Code" />
      <div className="pb-2">
        <P text="Feel free to contribute to " spanned />
        <A text="Guitardex's Repository" href="https://github.com/robchendev/Guitardex" spanned />
        <P
          text=" on GitHub, or fork the code for your own personal use. Documentation will be made soon to demonstrate how to make modules for any of the libraries without coding knowledge."
          spanned
        />
      </div>
      <H3 text="Fingerstyle Community" />
      <div className="pb-2">
        <P text="Join our " spanned />
        <A text="Discord" href="https://discord.gg/Khh9gN59fk" spanned />
        <P text=" Server!" spanned />
      </div>
      <H3 text="How It Works" />
      <P text="Guitardex does not have a curriculum but any user can make one through the usage of it's saving and sharing functionality. For example, a Guitardex shared by a musician gives their fans direct access to the specific tutorials necessary for them to learn in order to play their songs." />
      <div className="mb-2">
        <P
          text="See the Help page for more details on how to add and share your Guitardex, or try using this pre-made Guitardex: "
          spanned
        />
        <A
          text="Common Techniques"
          href="/?Common-Techniques_t=16.14.22.17.1.2.4.5.6.7.10.11.12"
          spanned
        />
        <P text="." spanned />
      </div>
      <P text="At the top of each module links the required modules, if any, that the user must know before learning it and at the bottom is a list of the modules that requires the current module, if any." />
      <H3 text="Future Development" />
      <P text="Guitardex aims to have more than just fingerstyle techniques in the future. It is programmed to save items from any 'library' within the web app. Currently, Techniques is the only library that has actual content. Future libraries can include information such as audio mixing and equipment. Currently, the Audio Production library is being made, and will be released in parts." />
      <P text="When I am able, I will be making improvements to this web app's functionality, UI, and content. You can view the changelog on the Development page." />
      <H3 text="Guitardex Team" />
      <P text="I have outsourced help from friends who excel in fields necessary to make this project as serviceable as possible. These are the people who have worked on this project:" />
      <VStack align="stretch" spacing={4} className="mt-2">
        {mainCredits.map((mainCredit: Credit, index: number) => (
          <MainCredit key={index} credit={mainCredit} />
        ))}
      </VStack>

      {/* <ExternalCredit /> */}
    </Wrapper>
  );
};

export default About;
