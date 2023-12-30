import { HStack, Input, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Guitardex } from "../../types";
import { hasDupes } from "../ModuleList/SaveButton";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { createInitialGuitardex, libraryReadable } from "../../utils/guitardex";
import { libraries, Library, ModuleFrontMatter, ModuleLists } from "../../types/dynamic/common";
import DexItem from "./DexItem";
import EmptySave from "./EmptySave";

const SAVE_KEY = "save";

const handleEnterKey = (event: any) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    event.target.blur();
  }
};

// TODO: Use state for this
const shortenSaveName = (save: Guitardex, setSave: (save: Guitardex) => void) => {
  setSave({ ...save, name: save.name.substring(0, 24) });
};

const decodeName = (encodedStr: string): string => {
  return encodedStr.replaceAll("-", " ");
};

const decodeModule = (item: string, library: string, result: Guitardex): void => {
  if (isNaN(item as any)) {
    return;
  }
  switch (library) {
    case "t":
      result.t.push(Number(item as unknown as number));
      break;
    case "a":
      result.a.push(Number(item as unknown as number));
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
    return;
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
  } else if (decodedArr.length === 2) {
    result = createInitialGuitardex(decodeName(decodedArr[0]));
    decodeAll(decodedArr[1], result);
  } else if (decodedArr.length === 1) {
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
    if (guitardex[key].length) {
      libraryArr.push(`${key}=${guitardex[key].join(".")}`);
    }
  }
  encodedStr += libraryArr.join("&");
  return encodedStr;
};

const copyExportURL = (exportURL: string, setCopyURLButton: (text: string) => void) => {
  navigator.clipboard.writeText(exportURL);
  setCopyURLButton("Copied!");
  setTimeout(() => {
    setCopyURLButton("Copy Link");
  }, 2 * 1000);
};

const clearSave = (setSave: (dex: Guitardex) => void) => {
  if (window.confirm("This will clear your guitardex. Click OK to continue.")) {
    setSave(createInitialGuitardex(""));
  }
};

const clearItem = (id, save: Guitardex, setSave: (dex: Guitardex) => void, library: Library) => {
  const temp = save[library];
  const index = temp.indexOf(id);
  if (index > -1) temp.splice(index, 1);
  const newSave = {
    ...save,
    [library]: temp,
  };
  setSave(newSave);
};

const handleDexOrderChange = (result, save: Guitardex, setSave: (dex: Guitardex) => void) => {
  if (!result.destination) {
    return;
  }

  const sourceLibrary = result.draggableId.split("-")[0];
  const items = Array.from(save[sourceLibrary]);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  const newSave = { ...save, [sourceLibrary]: items };
  setSave(newSave);
};

const DexMasterList = ({ moduleLists }: { moduleLists: ModuleLists }) => {
  const router = useRouter();
  const location = router.pathname;
  // console.log(router.query);
  let hasUrl = false;
  const importSave = (guitardex: Guitardex): Guitardex => {
    try {
      const importStr = window.location.search.replace("?", "");
      router.replace(location);
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
  const [exportURL, setExportURL] = useState("https://guitardex.com/?");
  const [copyURLButton, setCopyURLButton] = useState("Copy Link");

  useEffect(() => {
    let guitardex: Guitardex = createInitialGuitardex("");
    if (window.location.search.includes("?")) {
      guitardex = importSave(guitardex);
    } else if (localStorage.getItem(SAVE_KEY)) {
      guitardex = loadSave(guitardex);
    }
    setSave(guitardex);
  }, []);

  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    if (save.name.length > 24) {
      shortenSaveName(save, setSave);
    }
    setExportURL("https://guitardex.com/?" + encode(save));
  }, [save]);

  const [isEditingName, setIsEditingName] = useState(false);
  // TODO: Refactor....
  return (
    <div>
      {/* For different className based on if the user is entering 
      a new name, use focused: */}
      <div
        className={`border-b-2 rounded-t-md rounded-b-none ${!isEditingName && "border-bg2 "}${
          isEditingName || !save.name.length ? "bg-bg" : ""
        } + " " + ${isEditingName && "border-greyChecked bg-bg"}`}
      >
        <Input
          onKeyUp={(e) => handleEnterKey(e)}
          autoComplete="off"
          id="saveName"
          type="text"
          fontWeight={500}
          fontSize="1.6rem"
          textAlign="center"
          placeholder="Click to add a name..."
          variant="unstyled"
          maxLength={24}
          onFocus={() => setIsEditingName(true)}
          onBlur={() => setIsEditingName(false)}
          onInput={(e) => setSave({ ...save, name: (e.target as HTMLInputElement).value })}
          value={save.name}
        />
      </div>
      <HStack
        justify="flex-end"
        spacing={0}
        className={`select-none ${isEditingName ? "text-greyChecked" : "text-bg2"}`}
      >
        <span>{save.name.length}/24</span>
      </HStack>
      <DragDropContext onDragEnd={(e) => handleDexOrderChange(e, save, setSave)}>
        {libraries.map((library: Library, indexJ: number) => (
          <div key={indexJ}>
            {save[library].length !== 0 && (
              <h2 className={`text-xl font-medium mb-2 ${indexJ > 0 && "mt-2"}`}>
                {libraryReadable(library)}
              </h2>
            )}
            {save[library].length !== 0 && (
              <div className="">
                <Droppable droppableId={`techniques-${indexJ}`} key={`droppable-${indexJ}`}>
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} key={`ul-${indexJ}`}>
                      {save[library].map((id: number, index: number) => (
                        // react-beautiful-dnd has an issue where a unique key prop error shows on the console
                        // https://github.com/atlassian/react-beautiful-dnd/issues/2084
                        <Draggable
                          key={`${library}-${id}`}
                          draggableId={`${library}-${id}`}
                          index={index}
                          className="touch-manipulation"
                        >
                          {(provided) => {
                            const found = moduleLists[library].find(
                              // non strict inequality to compare string to number id
                              (moduleListItem: ModuleFrontMatter) => moduleListItem.id == id
                            );
                            if (found) {
                              return (
                                <li
                                  id={id.toString()}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className="pb-1.5"
                                >
                                  <DexItem
                                    library={library}
                                    module={found}
                                    onDelete={(e) => {
                                      clearItem(id, save, setSave, library);
                                      e.preventDefault();
                                    }}
                                  />
                                </li>
                              );
                            }
                          }}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>
            )}
          </div>
        ))}
      </DragDropContext>

      {libraries.reduce((acc, library) => acc + (save[library]?.length || 0), 0) === 0 ? (
        <EmptySave />
      ) : (
        <div className="mt-4">
          <HStack align="stretch" spacing={0}>
            <input
              value={exportURL}
              className="w-full bg-bg pl-3 py-1.5 rounded-l-md tracking-wide text-greyChecked"
              disabled
            />
            <button
              className="w-44 bg-purple rounded-r-md hover:bg-purpleHover transition-colors duration-200 text-white"
              onClick={() => copyExportURL(exportURL, setCopyURLButton)}
            >
              {copyURLButton}
            </button>
          </HStack>
          <VStack className="mt-4">
            <button
              onClick={() => clearSave(setSave)}
              className="w-32 px-3 py-1.5 bg-purple rounded-md hover:bg-purpleHover transition-colors duration-200 text-white"
            >
              Delete All
            </button>
            {/* <p>Deleting your browser cookies will also delete your Guitardex.</p> */}
          </VStack>
        </div>
      )}
    </div>
  );
};

export default DexMasterList;
