import { NextPage } from "next";
import React from "react";
import Wrapper from "../components/Wrapper";

const Index: NextPage = () => {
  return (
    <Wrapper title="Guitardex V2" hasFooter={false}>
      <div>Home</div>
    </Wrapper>
  );
};

export default Index;
