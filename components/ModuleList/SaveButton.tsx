import React, { useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { BiSave } from "react-icons/bi";

const SaveButton = ({ id }: { id: number }) => {
  const [saved, setSaved] = useState(false);

  const onSave = (e: any) => {
    e.preventDefault();
    setSaved(!saved);
  };

  return (
    <div className="p-4 bg-grey2-dark" onClick={onSave}>
      {saved ? <ImCheckmark /> : <BiSave />}
    </div>
  );
};

export default SaveButton;
