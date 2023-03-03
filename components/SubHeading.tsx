import { Heading } from "@chakra-ui/react";
import React from "react";

const SubHeading = ({ label }: { label: string }) => {
  return (
    <Heading
      as="h2"
      fontFamily="serif"
      className="md:w-8/12 font-weight:500 text-5xl text-center mx-auto my-7"
    >
      {label}
    </Heading>
  );
};

export default SubHeading;
