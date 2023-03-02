/* eslint-disable prettier/prettier */
import { Container, Heading, Image, Icon, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import Wrapper from "../components/Wrapper";

export const Index: NextPage = () => {
  return (
    <>
      <Wrapper>
        <div className=" w-full"></div>
        <div className="w-full mx-0">
          <div className="w-full">
            <h1 className="font-serif md:w-8/12 font-weight:900 text-5xl text-center mx-auto my-7">
              biography
            </h1>
            <div className="flex flex-wrap lg:max-w-7xl md:max-w-full justify-center mx-auto">
              <Image
                src="img/eddie.jpeg"
                alt="image is broken"
                className="h-max lg:w-1/2 md:w-full lg:max-w-xl md:max-w-full mb-5 object-scale-down rounded-lg"
              ></Image>
              <div className="lg:w-1/2 md:w-full pl-6 lg:max-w-xl md:max-w-full text-lg inline-block">
                <p className="mb-3">
                  Eddie is a fingerstyle guitarist from the Netherlands. His
                  continuous dedication to his passion has led to him creating
                  high-quality covers of popular music, which has garnered him
                  over 375 million views and over 2.5 million subscribers on
                  YouTube.
                </p>
                <p className="mb-3">
                  He first picked up the guitar when he was 10, and took lessons
                  for basics from his neighbor. At age of 13, Eddie was inspired
                  by Tommy Emmanuel to start learning fingerstyle. When he was
                  14, he was given the honor of being able to perform with Tommy
                  Tommy on stage, which was uploaded as his first video on
                  YouTube. A year later, he decided to create his own voice on
                  the guitar, shifting his focus to arranging and covering
                  songs. In 2013, he began taking YouTube more seriously and
                  started building an audience.
                </p>
                <p className="mb-3">
                  He is now 25 years old and has successfully made his passion
                  into a career. He is delighted to be able to share his guitar
                  music with the world. As of October 2020, Eddie has been
                  working full-time as a music producer.
                </p>
              </div>
            </div>
            <p>pogs</p>
            <h1 className="font-serif md:w-8/12 font-weight:900 text-5xl text-center mx-auto my-7">
              team
            </h1>
            <div className="flex flex-wrap lg:max-w-6xl md:max-w-full justify-center mb-14 mx-auto">
              <div className="flex flex-col items-center mx-5 lg:w-1/4 ">
                <Image
                  src="/img/jc300px.jpg"
                  alt="image broke"
                  className="rounded-3xl w-full h-full mb-5"
                ></Image>
                <span className="text-2xl">juliano</span>
                <p className="text-lg italic text-amber-200 ">cameraman</p>
                <div className="text-3xl mt-4">
                  <a>
                    <Icon as={FaYoutube} className="m-0.5"></Icon>
                  </a>
                  <a>
                    <Icon as={FaInstagram} className="m-0.5"></Icon>
                  </a>
                </div>
              </div>
              <div className="flex flex-col lg:w-1/4 mx-5 items-center">
                <Image
                  src="/img/unnamed300px.jpg"
                  alt="robert"
                  className="rounded-3xl w-full h-full mb-5"
                ></Image>
                <span className="text-2xl">robert</span>
                <p className="text-lg italic text-amber-200 ">transcriber</p>
                <div className="text-3xl mt-4">
                  <a>
                    <Icon as={FaYoutube} className="m-0.5"></Icon>
                  </a>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Index;
