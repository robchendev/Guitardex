import { Flex, HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import LinkIcon from "./LinkIcon";
import PageTitle from "./PageTitle";
import Sidebar from "./Sidebar";

const Footer = () => {
  return (
    <footer className="w-full justify-center flex text-white-soft pb-8 relative mt-12 lg:mt-16">
      <div className="container flex items-center justify-center mx-auto mb-6 text-center">
        <VStack spacing={0} className=" text-white-soft w-2/6">
          <div className="h-px w-full bg-grey-med mb-14" />
          <div className="font-serif">
            <HStack className="justify-center mb-5">
              {/* {icons.map((icon: SocialIcon, index: number) => (
                <LinkIcon key={index} icon={icon.icon} link={icon.link} />
              ))} */}
            </HStack>
            <div>© 2018-{new Date().getFullYear()} Eddie van der Meer</div>
            <div>
              <Link className="text-gold" href="/privacy-policy">
                Privacy Policy
              </Link>
            </div>
          </div>
        </VStack>
      </div>
    </footer>
  );
};

const Wrapper = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  return (
    <div className="h-full my-16 bg-white">
      <div className="h-full max-w-[1100px] m-auto my-0 px-8">
        <Flex className="justify-between">
          <div className="w-1/4">
            <Sidebar />
          </div>
          <div className="w-3/4">
            <div className="h-full ml-8">
              {title && <h1>{title}</h1>}
              {children}
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Wrapper;
