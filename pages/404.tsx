import { Center } from "@chakra-ui/react";
import React from "react";
import Wrapper from "../components/Wrapper";

const ErrorPage = () => {
  return (
    <Wrapper title="Page not found">
      <Center h="full">404</Center>
    </Wrapper>
  );
};

export default ErrorPage;
