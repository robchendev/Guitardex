import React from "react";
import { BiSolidVolume, BiSolidVolumeFull, BiSolidVolumeLow } from "react-icons/bi";

const VolumeIcon = ({ volumeLevel }: { volumeLevel: number }) => {
  if (volumeLevel > 0.5) {
    return (
      <div>
        <BiSolidVolumeFull />
      </div>
    );
  } else if (volumeLevel > 0) {
    return (
      <div>
        <BiSolidVolumeLow />
      </div>
    );
  } else {
    return (
      <div>
        <BiSolidVolume />
      </div>
    );
  }
};

export default VolumeIcon;
