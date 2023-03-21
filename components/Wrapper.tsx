import { HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { SocialIcon, icons } from "../config/config";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import LinkIcon from "./LinkIcon";
import PageTitle from "./PageTitle";

const Header = () => {
  return (
    <>
      <HeaderDesktop />
      <HeaderMobile />
    </>
  );
};

const Footer = () => {
  return (
    <footer className="w-full justify-center flex text-white-soft mt-4 pb-8 relative">
      <div className="container flex items-center justify-center mx-auto mb-6 text-center">
        <VStack spacing={0} className=" text-white-soft w-2/6">
          <div className="h-px w-full bg-grey-med mb-14" />
          <div className="font-serif">
            <HStack className="justify-center mb-5">
              {icons.map((icon: SocialIcon, index: number) => (
                <LinkIcon key={index} icon={icon.icon} link={icon.link} />
              ))}
            </HStack>
            <div>© 2018-2023 Eddie van der Meer</div>
            <div>
              <Link className="text-gold" href="#">
                Privacy Policy
              </Link>
               • 
              <Link className="text-gold" href="#">
                Cookie Policy
              </Link>
            </div>
          </div>
        </VStack>
      </div>
    </footer>
  );
};

const Wrapper = ({
  children,
  hasFooter = true,
  title,
}: {
  children: React.ReactNode;
  hasFooter?: boolean;
  title?: string;
}) => {
  return (
    <div className="bg-black-soft text-white-soft flex flex-col h-screen justify-between">
      <div>
        <Header />
        <main className="font-serif lg:max-w-4xl lg:mx-auto mb-12 w-full h-full">
          {title && <PageTitle title={title} />}
          {children}
        </main>
      </div>
      {hasFooter && <Footer />}
    </div>
  );
};

export default Wrapper;
