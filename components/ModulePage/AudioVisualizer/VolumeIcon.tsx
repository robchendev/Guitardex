import React, { useMemo } from "react";
import {
  BiSolidVolume,
  BiSolidVolumeFull,
  BiSolidVolumeLow,
  BiSolidVolumeMute,
} from "react-icons/bi";

const VolumeIcon = ({
  volumeLevel,
  muted,
  onClick,
}: {
  volumeLevel: number;
  muted: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}) => {
  const MemoizedIcon = useMemo(() => {
    if (muted) {
      return <BiSolidVolumeMute></BiSolidVolumeMute>;
    } else if (volumeLevel > 0.5) {
      return <BiSolidVolumeFull />;
    } else if (volumeLevel > 0) {
      return <BiSolidVolumeLow />;
    } else {
      return <BiSolidVolume />;
    }
  }, [volumeLevel, muted]);

  return (
    <div className="pl-3 pr-2 cursor-pointer" onClick={(e) => onClick && onClick(e)}>
      {MemoizedIcon}
    </div>
  );
};

export default VolumeIcon;
