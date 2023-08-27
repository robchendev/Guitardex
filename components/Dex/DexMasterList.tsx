import { Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Guitardex } from "../../types";
import { hasDupes } from "../ModuleList/SaveButton";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { HiOutlineTrash } from "react-icons/hi";
import { MdDragIndicator } from "react-icons/md";
import ModuleItem from "../ModuleList/ModuleItem";

const SAVE_KEY = "save";

const handleEnterKey = (event: any) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    event.target.blur();
  }
};

// TODO: Use state for this
const shortenSaveName = (saveNameToShorten: string) => {
  const newSaveName = saveNameToShorten.substring(0, 24);
  (document.getElementById("saveName") as HTMLInputElement).value = newSaveName;
  return newSaveName;
};

// hasDupes is exported from SaveButton

// TODO: To split into multiple dexes, use split on "&" and run the rest of this multiple times
const decode = (stringToDecode: string) => {
  let decoded: string[] = [];
  // TODO: use createInitialGuitardex
  let result: Guitardex = { name: "", t: [], a: [] };
  if (stringToDecode.includes("_")) {
    decoded = stringToDecode.split("_");
  } else {
    // Only Second half
    decoded = [stringToDecode];
  }
  // If saveName=1.2.3
  if (decoded.length === 2) {
    const decodedText = decoded[0].replace(/-/g, " ");
    let decodedItems: number[] = [];
    // check if 1.2.3 has number
    if (!/\d/.test(decoded[1])) {
      return { n: decodedText, e: decodedItems };
    }
    // If saveName=1.2.3 or saveName
    else if (decoded[1] !== "") {
      decodedItems = decoded[1].split(".").map(function (item) {
        return parseInt(item, 10);
      });
    }
    // If saveName= do nothing, since decodedItems is set to []
    return { n: decodedText, e: decodedItems };
  } else if (decoded.length === 1) {
    const decodedText = "";
    let decodedItems: number[] = [];
    // if not an empty string
    if (decoded[0] !== "") {
      // If 2.4 (string has numbers)
      if (/\d/.test(decoded[0])) {
        decodedItems = decoded[0].split(".").map(function (item) {
          return parseInt(item, 10);
        });
      }
      // If "" (string has no numbers), or asdfg, the save will clear
      else return false;
    }
    result = { name: decodedText, t: decodedItems, a: [] };
  }
  // Decoded array is >2 or 0 length
  // TODO: ... this returning Guitardex | boolean is terrible, pls fix
  else return false;
  return result;
};

const encode = (objectToEncode: Guitardex) => {
  const encodedItems = objectToEncode.t.join(".");
  if (objectToEncode.name === "") return encodedItems;
  return objectToEncode.name.replace(/\s/g, "-") + "_" + encodedItems;
};

// TODO: Use states for this
const exportURL = () => {
  navigator.clipboard.writeText(
    "https://guitardex.com/?" + encode(JSON.parse(localStorage.getItem(SAVE_KEY) ?? ""))
  );
  (document.getElementById("copyURLButton") as HTMLInputElement).innerHTML = "Copied!";
  setTimeout(() => {
    (document.getElementById("copyURLButton") as HTMLInputElement).innerHTML = "Copy Link";
  }, 2 * 1000);
};

// TODO: See if can autogenerate the empty arrays based on libraries
const clearSave = (setSave: (dex: Guitardex) => void) => {
  if (window.confirm("This will clear your guitardex. Click OK to continue.")) {
    setSave({ name: "", t: [], a: [] });
  }
};

// TODO: Use states for this...?
const clearItem = (id, save: Guitardex, setSave: (dex: Guitardex) => void) => {
  // eslint-disable-next-line
  // @ts-ignore
  document.getElementById(id.toString()).style.display = "none";
  const temp = save.t;
  const index = temp.indexOf(id);
  if (index > -1) temp.splice(index, 1);
  const newSave = {
    name: save.name,
    t: temp,
    a: [],
  };
  setSave(newSave);
};

const handleNameChange = (
  e: React.FormEvent<HTMLInputElement>,
  save: Guitardex,
  setSave: (dex: Guitardex) => void
) => {
  const newName = e.target.value.replace(/[-=~_%']/g, "");
  const newSave = { name: newName, t: save.t, a: [] };
  setSave(newSave);
};

const handleDexOrderChange = (result, save: Guitardex, setSave: (dex: Guitardex) => void) => {
  if (!result.destination) return;
  const items = Array.from(save.t);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);
  const newSave = { name: save.name, t: items, a: [] };
  setSave(newSave);
};

const DexMasterList = () => {
  // TODO: Use createInitialGuitardex
  let savedObj: Guitardex = {
    name: "",
    t: [],
    a: [],
  };
  const location = useRouter().pathname;
  let hasUrl = false;
  if (typeof window !== "undefined") {
    try {
      let stringToImport = "";
      // TODO: use createInitialGuitardex
      let newSave: Guitardex = { name: "", t: [], a: [] };
      if (window.location.search.includes("?")) {
        stringToImport = window.location.search.replace("?", "");
        newSave = decode(stringToImport);
        window.history.replaceState({}, document.title, location);
        // If save is NOT empty or does not exist
        // This will work when save exists OR save is not empty
        // TODO: Loop through and check all library saves
        if (hasDupes(newSave.t)) throw new Error("Save has duplicate ID");
        if (
          localStorage.getItem(SAVE_KEY) !== null &&
          localStorage.getItem(SAVE_KEY) !== '{"n":"","e":[]}'
        ) {
          if (window.confirm("This will replace your current save. Continue?")) {
            savedObj = newSave;
          } else {
            savedObj = JSON.parse(localStorage.getItem(SAVE_KEY));
          }
        } else {
          savedObj = newSave;
        }
        hasUrl = true;
      }
    } catch (error) {
      alert("Invalid save profile detected. Save will not be loaded.\n" + error);
    }
  }
  if (typeof window !== "undefined" && localStorage.getItem(SAVE_KEY)) {
    try {
      const save = JSON.parse(localStorage.getItem(SAVE_KEY) ?? "");
      if (hasDupes(save.t)) throw new Error("Save has duplicate ID");
      if (
        typeof save.name !== "string" &&
        Object.prototype.toString.call(save.t) !== "[object Array]"
      ) {
        savedObj.name = "";
        savedObj.t = [];
      } else if (typeof save.n !== "string") savedObj.name = "";
      else if (Object.prototype.toString.call(save.t) !== "[object Array]") {
        savedObj.t = [];
      } else if (!hasUrl) savedObj = JSON.parse(localStorage.getItem(SAVE_KEY) ?? ""); // PROBLEM
    } catch (error) {
      alert("Invalid save profile detected. Clearing save.\n" + error);
    }
  }
  const [save, setSave] = useState(savedObj);
  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    if (save.name.length > 24) save.name = shortenSaveName(save.name);
    if ((document.getElementById("exportURL") as HTMLInputElement)?.value) {
      document.getElementById("exportURL").value = "https://gdex.cc/?" + encode(save);
    }
    if ((document.getElementById("inputLimit") as HTMLInputElement)?.innerHTML) {
      document.getElementById("inputLimit").innerHTML = save.name.length;
    }
    console.log(save);
  }, [save]);

  // TODO: Refactor....
  return (
    <div>
      <Input
        onKeyUp={handleEnterKey}
        autoComplete="off"
        id="saveName"
        type="text"
        placeholder="Click to add a name..."
        maxLength={24}
        onInput={(e) => handleNameChange(e, save, setSave)}
        value={save.name}
      />
      <span>
        <span id="inputLimit"></span>
        <span>/24</span>
      </span>
      {save.t.length ? (
        <div>
          <DragDropContext onDragEnd={handleDexOrderChange}>
            <Droppable droppableId="techniques">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {save.t?.map((id, index) => {
                    if (id !== null) {
                      return (
                        <Draggable key={id} draggableId={id.toString()} index={index}>
                          {(provided) => (
                            <li
                              id={id.toString()}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <div>
                                <MdDragIndicator />
                              </div>
                              <div>
                                {/* TODO: Will need to pass allFrontMatter into here since ModuleItem
                                 requires the module frontmatter. We can use the saved item ID to 
                                 get something like module={moduleData[indexOfMatchingModule]}
                                 Though, will most likely need to edit ModuleItem to include the flag
                                 'isDex' to differentiate from the regular ModuleItem in library lists */}
                                {/* <ModuleItem ={id}/> */}
                                <HiOutlineTrash
                                  onClick={(e) => {
                                    clearItem(id, save, setSave);
                                    e.preventDefault();
                                  }}
                                />
                              </div>
                            </li>
                          )}
                        </Draggable>
                      );
                    }
                    return <></>;
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      ) : (
        <div>There aren't any items</div>
      )}
      <input id="exportURL" defaultValue={"https://gdex.cc/?" + encode(save)} disabled></input>
      <button id="copyURLButton" onClick={exportURL}>
        Copy Link
      </button>
      {save.t.length !== 0 && (
        <div>
          <div onClick={() => clearSave(setSave)}>delete all</div>
          Deleting your browser cookies will also delete your Guitardex.
        </div>
      )}
      <div></div>DexMasterList
    </div>
  );
};

export default DexMasterList;
