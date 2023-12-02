import React from "react";

const BypassNotice = ({ isShown }: { isShown: boolean }) => {
  return (
    <div
      className="text-ghost lg:text-xl"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        display: isShown ? "block" : "none",
      }}
    >
      Bypassing FX
    </div>
  );
};

export default BypassNotice;
