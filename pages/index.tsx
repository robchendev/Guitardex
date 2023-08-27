import { NextPage } from "next";
import React from "react";
import DexMasterList from "../components/Dex/DexMasterList";
import Wrapper from "../components/Wrapper";

const Index: NextPage = () => {
  return (
    <Wrapper>
      <DexMasterList />
    </Wrapper>
  );
};

export default Index;
