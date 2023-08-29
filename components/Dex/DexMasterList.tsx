import { Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Guitardex } from "../../types";
import { hasDupes } from "../ModuleList/SaveButton";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { HiOutlineTrash } from "react-icons/hi";
import { MdDragIndicator } from "react-icons/md";
import ModuleItem from "../ModuleList/ModuleItem";
import { createInitialGuitardex } from "../../utils/guitardex";
import { libraries, Library } from "../../types/dynamic/common";

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

const decodeName = (encodedStr: string): string => {
  return encodedStr.replace("-", " ");
};

const decodeModule = (item: string, library: string, result: Guitardex): void => {
  if (isNaN(item as any)) {
    return;
  }
  switch (library) {
    case "t":
      result.t.push(item as unknown as number);
      break;
    case "a":
      result.a.push(item as unknown as number);
      break;
    default:
      break;
  }
};

const decodeAll = (moduleStr: string, result: Guitardex) => {
  // backwards compatible with V1
  if (!moduleStr.includes("=")) {
    const techniques = moduleStr.split(".");
    for (const technique of techniques) {
      decodeModule(technique, "t", result);
    }
  }
  // V2
  const modules: string[] = moduleStr.split("&");
  for (const moduleLibrary of modules) {
    const moduleLibraryItems = moduleLibrary.split("=");
    if (moduleLibraryItems.length !== 2) {
      throw Error("Library should be in the format of x=y.y.y...");
    }
    const [library, itemStr] = moduleLibraryItems;
    const items = itemStr.split(".");
    for (const item of items) {
      decodeModule(item, library, result);
    }
  }
};

//  /?name_t=x.x.x&a=y.y.y
const decode = (encodedStr: string): Guitardex => {
  let result: Guitardex;
  let decodedArr: string[] = [];
  let hasName = false;
  if (encodedStr.includes("_")) {
    hasName = true;
  }
  decodedArr = encodedStr.split("_");
  if (decodedArr.length > 2) {
    throw Error("There can only be 1 underscore in the URL");
  }
  if (decodedArr.length === 2) {
    result = createInitialGuitardex(decodeName(decodedArr[0]));
    decodeAll(decodedArr[1], result);
  }
  if (decodedArr.length === 1) {
    if (hasName) {
      result = createInitialGuitardex(decodeName(decodedArr[0]));
    } else {
      result = createInitialGuitardex("");
      decodeAll(decodedArr[0], result);
    }
  } else {
    result = createInitialGuitardex("");
  }
  return result;
};

const encode = (guitardex: Guitardex) => {
  let encodedStr = "";
  if (guitardex.name) {
    const encodedName = guitardex.name.replace(/\s/g, "-") + "_";
    encodedStr += encodedName;
  }
  const libraryArr: string[] = [];
  for (const key of libraries as unknown as Library[]) {
    libraryArr.push(`${key}=${guitardex[key].join(".")}`);
  }
  encodedStr += libraryArr.join("&");
  return encodedStr;
};

// TODO: Use states for this
const copyExportURL = (exportURL: string, setCopyURLButton: (text: string) => void) => {
  navigator.clipboard.writeText(exportURL);
  setCopyURLButton("Copied!");
  setTimeout(() => {
    setCopyURLButton("Copy Link");
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
  const location = useRouter().pathname;
  let hasUrl = false;

  const importSave = (guitardex: Guitardex): Guitardex => {
    try {
      const importStr = window.location.search.replace("?", "");
      window.history.replaceState({}, document.title, location);
      guitardex = decode(importStr);
      for (const key of libraries as unknown as Library[]) {
        if (hasDupes(guitardex[key])) {
          throw new Error("Save has duplicate ID");
        }
      }
      hasUrl = true;
    } catch (error) {
      alert("Invalid save profile detected. Save will not be loaded.\n" + error);
    }
    return guitardex;
  };

  const loadSave = (guitardex: Guitardex): Guitardex => {
    try {
      const localSave = localStorage.getItem(SAVE_KEY);
      if (localSave) {
        guitardex = JSON.parse(localSave ?? "");
        for (const key of libraries as unknown as Library[]) {
          if (hasDupes(guitardex[key])) {
            throw new Error("Save has duplicate ID");
          }
        }
        if (typeof guitardex.name !== "string") {
          guitardex = createInitialGuitardex("");
        } else if (typeof guitardex.name !== "string") {
          guitardex.name = "";
        } else if (!hasUrl) {
          guitardex = JSON.parse(localSave ?? "");
        }
      }
    } catch (error) {
      alert("Invalid save profile detected. Clearing save.\n" + error);
    }
    return guitardex;
  };

  const [save, setSave] = useState(createInitialGuitardex(""));
  const [exportURL, setExportURL] = useState("https://gdex.cc/?");
  const [copyURLButton, setCopyURLButton] = useState("Copy Link");

  useEffect(() => {
    let guitardex: Guitardex = createInitialGuitardex("");
    if (window.location.search.includes("?")) {
      guitardex = importSave(guitardex);
    }
    if (localStorage.getItem(SAVE_KEY)) {
      guitardex = loadSave(guitardex);
    }
    setSave(guitardex);
  }, []);

  useEffect(() => {
    // localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    if (save.name.length > 24) save.name = shortenSaveName(save.name);
    setExportURL("https://gdex.cc/?" + encode(save));
  }, [save]);

  const [isEditingName, setIsEditingName] = useState(false);
  // TODO: Refactor....
  return (
    <div>
      {/* For different className based on if the user is entering 
      a new name, use focused: */}
      <div className={`${isEditingName ? "bg-purple" : ""}`}>
        <Input
          onKeyUp={(e) => handleEnterKey(e)}
          autoComplete="off"
          id="saveName"
          type="text"
          placeholder="Click to add a name..."
          variant="unstyled"
          maxLength={24}
          onFocus={() => setIsEditingName(true)}
          onBlur={() => setIsEditingName(false)}
          onInput={(e) => handleNameChange(e, save, setSave)}
          value={save.name}
        />
      </div>
      {/* <span>
        <span>{save.name.length}</span>
        <span>/24</span>
      </span> */}
      {save.t.length ? (
        <div>
          <DragDropContext onDragEnd={(e) => handleDexOrderChange(e, save, setSave)}>
            <Droppable droppableId="techniques">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {save.t.map((id: number, index: number) => {
                    if (id) {
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
      <input value={exportURL} className="w-full" disabled />
      <button onClick={() => copyExportURL(exportURL, setCopyURLButton)}>{copyURLButton}</button>
      {save.t.length !== 0 && (
        <div>
          <div onClick={() => clearSave(setSave)}>Delete all</div>
          Deleting your browser cookies will also delete your Guitardex.
        </div>
      )}
      <div></div>DexMasterList
    </div>
  );
};

export default DexMasterList;