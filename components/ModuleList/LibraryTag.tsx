import React from "react";
import { Library } from "../../types/dynamic/common";
import ColorTag from "./ColorTag";

const LibraryTag = ({ library }: { library: Library }) => {
  switch (library) {
    case "t":
      return <ColorTag className="bg-purple">technique</ColorTag>;
    case "a":
      return <ColorTag className="bg-purple">audio</ColorTag>;
    default:
      return <ColorTag className="bg-purple">unknown</ColorTag>;
  }
};

export default LibraryTag;
