import React from "react";
import { Module } from "../../types/dynamic/common";

const ModuleTag = ({ module }: { module: Module }) => {
  return <div>{module}</div>;
};

export default ModuleTag;
