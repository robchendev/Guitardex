import React, { useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { BiSave } from "react-icons/bi";
import { Module } from "../../types/dynamic/common";

const SaveButton = ({ id, module }: { id: number; module: Module }) => {
  const [saved, setSaved] = useState(false);

  const onSave = (e: any) => {
    e.preventDefault();
    setSaved(!saved);
  };

  // TODO: Lots of todo, also make sure the module can be differentiated
  return (
    <div className="p-4 bg-grey2-dark" onClick={onSave}>
      {saved ? <ImCheckmark /> : <BiSave />}
    </div>
  );
};

export default SaveButton;
