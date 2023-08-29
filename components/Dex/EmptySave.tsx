import React from "react";
import DexInfoItem from "./DexInfoItem";

const EmptySave = () => {
  return (
    <div>
      <DexInfoItem
        title="Learn fingerstyle techniques"
        subtitle="Browse modules in the /t library"
        href="/t"
      />
      <DexInfoItem
        title="Learn fingerstyle audio production"
        subtitle="Browse modules in the /a library"
        href="/a"
      />
      <DexInfoItem title="New to Guitardex?" subtitle="Click here for help" href="/help" />
    </div>
  );
};

export default EmptySave;
