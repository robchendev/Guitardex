import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

const DeleteButton = ({ onDelete }: { onDelete: (e) => void }) => {
  return (
    <div
      className={
        "w-16 h-full flex justify-center items-center cursor-pointer text-3xl text-greyChecked hover:text-link"
      }
      onClick={onDelete}
    >
      <HiOutlineTrash />
    </div>
  );
};

export default DeleteButton;
