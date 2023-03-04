/* eslint-disable prettier/prettier */
import { Image } from "@chakra-ui/react";
import { NextPage } from "next";
import SubHeading from "../components/SubHeading";
import TeamMember from "../components/TeamMember";
import Wrapper from "../components/Wrapper";

export const Index: NextPage = () => {
  return (
    <Wrapper title="biography">
      <div className="w-full mx-0">
        <div className="flex flex-wrap justify-center mx-auto">
          <Image
            src="img/eddie.jpeg"
            alt="image is broken"
            className="h-max lg:w-1/2 md:w-full lg:max-w-xl md:max-w-full mb-5 object-scale-down rounded-lg"
          />
          <div className="lg:w-1/2 md:w-full pl-6 lg:max-w-xl md:max-w-full text-lg inline-block">
            <p className="mb-3">
              Eddie is a fingerstyle guitarist from the Netherlands. His
              continuous dedication to his passion has led to him creating
              high-quality covers of popular music, which has garnered him over
              375 million views and over 2.5 million subscribers on YouTube.
            </p>
            <p className="mb-3">
              He first picked up the guitar when he was 10, and took lessons for
              basics from his neighbor. At age of 13, Eddie was inspired by
              Tommy Emmanuel to start learning fingerstyle. When he was 14, he
              was given the honor of being able to perform with Tommy Tommy on
              stage, which was uploaded as his first video on YouTube. A year
              later, he decided to create his own voice on the guitar, shifting
              his focus to arranging and covering songs. In 2013, he began
              taking YouTube more seriously and started building an audience.
            </p>
            <p className="mb-3">
              He is now 25 years old and has successfully made his passion into
              a career. He is delighted to be able to share his guitar music
              with the world. As of October 2020, Eddie has been working
              full-time as a music producer.
            </p>
          </div>
        </div>
        <SubHeading label="team" />
        <div className="flex flex-wrap lg:max-w-6xl md:max-w-full justify-center mb-14 mx-auto">
          <TeamMember
            name="juliano"
            role="cameraman"
            imageUrl="/img/jc300px.jpg"
            socials={[
              { type: "youtube", link: "#" },
              { type: "instagram", link: "#" },
            ]}
          />
          <TeamMember
            name="robert"
            role="transcriber"
            imageUrl="/img/unnamed300px.jpg"
            socials={[{ type: "youtube", link: "#" }]}
          />
          <TeamMember
            name="constantine"
            role="developer"
            imageUrl="/img/constantine.jpg"
            socials={[
              { type: "github", link: "https://github.com/dead-weight" },
            ]}
          />
        </div>
        <div></div>
      </div>
    </Wrapper>
  );
};

export default Index;
