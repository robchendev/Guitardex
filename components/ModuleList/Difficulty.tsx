import React from "react";
import { Difficulty } from "../../types/dynamic/common";
import ColorTag from "./ColorTag";

const Difficulty = ({ value }: { value: Difficulty }) => {
  switch (value) {
    case "easy":
      return <ColorTag className="bg-green">easy</ColorTag>;
    case "med":
      return <ColorTag className="bg-yellow">med</ColorTag>;
    case "hard":
      return <ColorTag className="bg-red">hard</ColorTag>;
    default:
      return <span>Difficulty</span>;
  }
};

export default Difficulty;
