import React, { useEffect, useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { BiSave } from "react-icons/bi";
import { Library } from "../../types/dynamic/common";
import { Guitardex } from "../../types";

const hasDupes = (array: number[]) => new Set(array).size !== array.length;
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

  const initSave: Guitardex = {
    name: "My Guitardex",
    techniques: [],
    audioProduction: [],
  };
  let save: Guitardex;
  save = initSave;

  if (typeof window !== "undefined" && localStorage.getItem(SAVE_KEY)) {
    try {
      save = JSON.parse(localStorage.getItem(SAVE_KEY) ?? "");
      if (hasDupes(save.techniques)) throw new Error("Save has duplicate ID in techniques");
      if (hasDupes(save.audioProduction))
        throw new Error("Save has duplicate ID in audioProduction");
      if (
        typeof save.name !== "string" &&
        (Object.prototype.toString.call(save.techniques) !== "[object Array]" ||
          Object.prototype.toString.call(save.audioProduction) !== "[object Array]")
      ) {
        save = initSave;
      } else if (typeof save.name !== "string") {
        save.name = "My Guitardex";
      } else if (Object.prototype.toString.call(save.techniques) !== "[object Array]") {
        save.techniques = [];
      } else if (Object.prototype.toString.call(save.audioProduction) !== "[object Array]") {
        save.audioProduction = [];
      }
    } catch (error) {
      alert("Invalid save profile detected. Clearing save.\n" + error);
      localStorage.setItem(SAVE_KEY, JSON.stringify(initSave));
    }
  }

  let index = -1;
  switch (library) {
    case "t":
      index = save.techniques.findIndex((item: number) => item === id);
      break;
    case "a":
      index = save.audioProduction.findIndex((item: number) => item === id);
      break;
  }
  useEffect(() => {
    setSaved(index >= 0);
    const newSave = {
      name: save.name,
      techniques: save.techniques,
      audioProduction: save.audioProduction,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(newSave));
  }, [index, save.name, save.techniques, save.audioProduction]);

  const addSave = (id: number) => {
    switch (library) {
      case "t":
        localStorage.setItem(
          SAVE_KEY,
          JSON.stringify({ ...save, techniques: save.techniques.concat(id) })
        );
        break;
      case "a":
        localStorage.setItem(
          SAVE_KEY,
          JSON.stringify({ ...save, audioProduction: save.audioProduction.concat(id) })
        );
        break;
      default:
        console.log(`Library ${library} is not supported for addSave.`);
    }
    setSaved(true);
  };

  const removeSave = (index: number) => {
    switch (library) {
      case "t":
        save.techniques.splice(index, 1);
        localStorage.setItem(SAVE_KEY, JSON.stringify({ ...save, techniques: save.techniques }));
        break;
      case "a":
        save.audioProduction.splice(index, 1);
        localStorage.setItem(
          SAVE_KEY,
          JSON.stringify({ ...save, audioProduction: save.audioProduction })
        );
        break;
      default:
        console.log(`Library ${library} is not supported for removeSave.`);
    }
    setSaved(false);
  };

  const updateSave = () => {
    // localStorage of save already exists
    if (localStorage.getItem(SAVE_KEY)) {
      save = JSON.parse(localStorage.getItem(SAVE_KEY) ?? "");
    }
    switch (library) {
      case "t":
        index = save.techniques.findIndex((item: number) => item === id);
        break;
      case "a":
        index = save.audioProduction.findIndex((item: number) => item === id);
        break;
      default:
        console.log(`Library ${library} is not supported for updateSave.`);
    }
    if (index >= 0) {
      removeSave(index);
    } else {
      addSave(id);
    }
    console.log(save, id);
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
