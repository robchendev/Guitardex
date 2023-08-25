import React, { useEffect, useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { BiSave } from "react-icons/bi";
import { Module } from "../../types/dynamic/common";
import { Guitardex } from "../../types";

const hasDupes = (array: number[]) => new Set(array).size !== array.length;
const SAVE_KEY = "save";

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

  const initSave: Guitardex = {
    name: "My Guitardex",
    techniques: [],
    audioSkills: [],
  };
  let save: Guitardex;
  save = initSave;

  if (typeof window !== "undefined" && localStorage.getItem(SAVE_KEY)) {
    try {
      save = JSON.parse(localStorage.getItem(SAVE_KEY) ?? "");
      if (hasDupes(save.techniques)) throw new Error("Save has duplicate ID in techniques");
      if (hasDupes(save.audioSkills)) throw new Error("Save has duplicate ID in audioSkills");
      if (
        typeof save.name !== "string" &&
        (Object.prototype.toString.call(save.techniques) !== "[object Array]" ||
          Object.prototype.toString.call(save.audioSkills) !== "[object Array]")
      ) {
        save = initSave;
      } else if (typeof save.name !== "string") {
        save.name = "My Guitardex";
      } else if (Object.prototype.toString.call(save.techniques) !== "[object Array]") {
        save.techniques = [];
      } else if (Object.prototype.toString.call(save.audioSkills) !== "[object Array]") {
        save.audioSkills = [];
      }
    } catch (error) {
      alert("Invalid save profile detected. Clearing save.\n" + error);
    }
  }

  let index = -1;
  switch (module) {
    case "technique":
      index = save.techniques.findIndex((item: number) => item === id);
      break;
    case "audioSkill":
      index = save.audioSkills.findIndex((item: number) => item === id);
      break;
  }
  useEffect(() => {
    setSaved(index >= 0);
    const newSave = {
      name: save.name,
      techniques: save.techniques,
      audioSkills: save.audioSkills,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(newSave));
  }, [index, save.name, save.techniques, save.audioSkills]);

  const addSave = (id: number) => {
    switch (module) {
      case "technique":
        localStorage.setItem(
          SAVE_KEY,
          JSON.stringify({ ...save, techniques: save.techniques.concat(id) })
        );
        break;
      case "audioSkill":
        localStorage.setItem(
          SAVE_KEY,
          JSON.stringify({ ...save, audioSkills: save.audioSkills.concat(id) })
        );
        break;
      default:
        console.log(`Module ${module} is not supported for addSave.`);
    }
    setSaved(true);
  };

  const removeSave = (index: number) => {
    switch (module) {
      case "technique":
        save.techniques.splice(index, 1);
        localStorage.setItem(SAVE_KEY, JSON.stringify({ ...save, techniques: save.techniques }));
        break;
      case "audioSkill":
        save.audioSkills.splice(index, 1);
        localStorage.setItem(SAVE_KEY, JSON.stringify({ ...save, audioSkills: save.audioSkills }));
        break;
      default:
        console.log(`Module ${module} is not supported for removeSave.`);
    }
    setSaved(false);
  };

  const updateSave = () => {
    // localStorage of save already exists
    if (localStorage.getItem(SAVE_KEY)) {
      save = JSON.parse(localStorage.getItem(SAVE_KEY) ?? "");
    }
    switch (module) {
      case "technique":
        index = save.techniques.findIndex((item: number) => item === id);
        break;
      case "audioSkill":
        index = save.audioSkills.findIndex((item: number) => item === id);
        break;
      default:
        console.log(`Module ${module} is not supported for updateSave.`);
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
