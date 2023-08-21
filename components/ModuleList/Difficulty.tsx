import React from "react";
import { Difficulty } from "../../types/dynamic/techniques";

const Difficulty = ({ value }: { value: Difficulty }) => {
  switch (value) {
    case "easy":
      return <span>easy</span>;
    case "med":
      return <span>med</span>;
    case "hard":
      return <span>hard</span>;
  }
  return <span>Difficulty</span>;
};

export default Difficulty;
