import React from "react";
import { Module } from "../../types/dynamic/common";
import ColorTag from "./ColorTag";

const ModuleTag = ({ module }: { module: Module }) => {
  return <ColorTag className="bg-purple">{module}</ColorTag>;
};

export default ModuleTag;
