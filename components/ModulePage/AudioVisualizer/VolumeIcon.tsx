import React from "react";
import {
  BiSolidVolume,
  BiSolidVolumeFull,
  BiSolidVolumeLow,
  BiSolidVolumeMute,
} from "react-icons/bi";

const VolumeIcon = ({ volumeLevel }: { volumeLevel: number }) => {
  if (volumeLevel > 0.5) {
    return (
      <div className="pl-3 pr-2 cursor-pointer">
        <BiSolidVolumeFull />
      </div>
    );
  } else if (volumeLevel > 0) {
    return (
      <div className="pl-3 pr-2 cursor-pointer">
        <BiSolidVolumeLow />
      </div>
    );
  } else {
    return (
      <div className="pl-3 pr-2 cursor-pointer">
        <BiSolidVolume />
      </div>
    );
  }
};

export default VolumeIcon;
