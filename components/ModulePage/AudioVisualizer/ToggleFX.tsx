import { HStack } from "@chakra-ui/react";
import React from "react";
import { FaPowerOff } from "react-icons/fa";

const ToggleFX = ({ isOn, onClick }: { isOn: boolean; onClick: () => void }) => {
  return (
    <button
      className={`px-3 py-2 h-10 rounded-md font-medium ${
        isOn ? "border-grey bg-grey text-ghost" : "border-purple bg-purple text-white"
      }`}
      onClick={onClick}
    >
      <HStack>
        <FaPowerOff />
        <div className="leading-4">FX</div>
      </HStack>
    </button>
  );
};

export default ToggleFX;
