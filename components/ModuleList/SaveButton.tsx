import React, { useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { BiSave } from "react-icons/bi";
import { Module } from "../../types/dynamic/common";

const SaveButton = ({
  id,
  module,
  isGhost = false,
}: {
  id: number;
  module: Module;
  isGhost?: boolean;
}) => {
  const [saved, setSaved] = useState(false);

  const onSave = (e: any) => {
    e.preventDefault();
    setSaved(!saved);
  };

  if (isGhost) {
    return (
      <div
        className={`w-16 flex justify-center items-center cursor-pointer group ${
          saved
            ? "text-2xl hover:text-greyChecked-light text-purple"
            : "text-3xl text-greyChecked-light hover:text-purple"
        }`}
        onClick={onSave}
      >
        {saved ? <ImCheckmark /> : <BiSave />}
      </div>
    );
  }
  return (
    <div
      className={`w-14 h-14 flex justify-center items-center border-2 border-grey-light bg-white rounded-md cursor-pointer group ${
        saved
          ? "text-2xl hover:text-greyChecked-light text-purple"
          : "text-3xl text-greyChecked-light hover:text-purple"
      }`}
      onClick={onSave}
    >
      {saved ? <ImCheckmark /> : <BiSave />}
    </div>
  );
};

export default SaveButton;
