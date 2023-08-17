import React from "react";
import Button from "./Button";
import Divider from "./Divider";

const Sidebar = () => {
  return (
    <div className="rounded-lg bg-slate py-4 px-5 w-[300px] fixed">
      <Button>My Guitardex</Button>
      <Button>Techniques</Button>
      <Button>Help</Button>
      <Divider />
      <Button>About</Button>
      <Button>Updates</Button>
      <Divider />
      <Button>Dark Mode</Button>
    </div>
  );
};

export default Sidebar;
