import React, { useEffect, useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { BiSave } from "react-icons/bi";
import { libraries, Library } from "../../types/dynamic/common";
import { Guitardex } from "../../types";
import { createInitialGuitardex } from "../../utils/guitardex";

export const hasDupes = (array: number[]) => new Set(array).size !== array.length;
const SAVE_KEY = "save";

const SaveButton = ({
  id,
  library,
  isGhost = false,
}: {
  id: number;
  library: Library;
  isGhost?: boolean;
}) => {
  const [saved, setSaved] = useState(false);
  const initSave: Guitardex = createInitialGuitardex("My Guitardex");
  let save: Guitardex = initSave;

  if (typeof window !== "undefined" && localStorage.getItem(SAVE_KEY)) {
    try {
      save = JSON.parse(localStorage.getItem(SAVE_KEY) ?? "");
      if (typeof save.name !== "string") {
        save.name = "My Guitardex";
      }
      for (const libraryId of libraries) {
        if (hasDupes(save[libraryId])) {
          save[libraryId] = [];
          throw new Error(`Save has duplicate ID in library ${libraryId}`);
        }
        if (Object.prototype.toString.call(save[libraryId]) !== "[object Array]") {
          save[libraryId] = [];
          throw new Error(`Save has wrong formatting in library ${libraryId}`);
        }
      }
    } catch (error) {
      alert("Invalid save profile. Clearing save.\n" + error);
      localStorage.setItem(SAVE_KEY, JSON.stringify(initSave));
    }
  }

  let index = -1;
  index = save[library].indexOf(id);

  useEffect(() => {
    setSaved(index >= 0);
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  }, [index]);

  const addSave = (id: number) => {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({ ...save, [library]: save[library].concat(id) })
    );
    setSaved(true);
  };

  const removeSave = (index: number) => {
    save[library].splice(index, 1);
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...save, [library]: save[library] }));
    setSaved(false);
  };

  const updateSave = () => {
    if (localStorage.getItem(SAVE_KEY)) {
      save = JSON.parse(localStorage.getItem(SAVE_KEY) ?? "");
    }
    index = save[library].indexOf(id);
    if (index >= 0) {
      removeSave(index);
    } else {
      addSave(id);
    }
  };

  const onSave = (e: any) => {
    e.preventDefault();
    updateSave();
  };

  if (isGhost) {
    return (
      <div
        className={`w-16 h-full flex justify-center items-center cursor-pointer group ${
          saved
            ? "text-2xl hover:text-greyChecked text-link"
            : "text-3xl text-greyChecked hover:text-link"
        }`}
        onClick={onSave}
      >
        {saved ? <ImCheckmark /> : <BiSave />}
      </div>
    );
  }
  return (
    <div
      className={`w-14 h-14 flex justify-center items-center border-2 border-grey bg-bg2 rounded-md cursor-pointer group ${
        saved
          ? "text-2xl hover:text-greyChecked text-link"
          : "text-3xl text-greyChecked hover:text-link"
      }`}
      onClick={onSave}
    >
      {saved ? <ImCheckmark /> : <BiSave />}
    </div>
  );
};

export default SaveButton;
