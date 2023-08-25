import React from "react";
import { Module } from "../../types/dynamic/common";
import ColorTag from "./ColorTag";

const ModuleTag = ({ module }: { module: Module }) => {
  switch (module) {
    case "technique":
      return <ColorTag className="bg-purple">technique</ColorTag>;
    case "audioSkill":
      return <ColorTag className="bg-purple">audio</ColorTag>;
  }
};

export default ModuleTag;
