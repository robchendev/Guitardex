import React from "react";
import { Library } from "../../types/dynamic/common";

const EmptySave = ({ library }: { library: Library }) => {
  switch (library) {
    case "t":
      return <div>No items in techniques</div>;
    case "a":
      return <div>No items in audio production</div>;
    default:
      return <div>No items in unknown</div>;
  }
};

export default EmptySave;
