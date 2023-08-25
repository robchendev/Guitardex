import { VStack } from "@chakra-ui/react";
import React from "react";
import Button from "./Button";
import Divider from "./Divider";
import { useRouter } from "next/router";
import {
  HiOutlineUserGroup,
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineQuestionMarkCircle,
  HiOutlineDatabase,
  HiOutlineCurrencyDollar,
  HiOutlineAdjustments,
} from "react-icons/hi";
import { FiMoon, FiSun } from "react-icons/fi";

const Sidebar = () => {
  const path = useRouter().pathname;

  return (
    <div className="rounded-lg bg-bg-light py-4 px-5 w-full sticky top-16">
      <VStack alignItems="flex-start" spacing={2}>
        <Button url="/" path={path} icon={HiOutlineHome}>
          My Guitardex
        </Button>
        <Button url="/t" path={path} icon={HiOutlineViewGrid}>
          Techniques
        </Button>
        <Button url="/a" path={path} icon={HiOutlineAdjustments}>
          Audio Production
        </Button>
        {/* <Button url="/maintenance" path={path} icon={HiOutlineAdjustments}>
          Audio Production
        </Button> */}
        <Button url="/help" path={path} icon={HiOutlineQuestionMarkCircle}>
          Help
        </Button>
        <Divider />
        <Button url="about" path={path} icon={HiOutlineUserGroup}>
          About
        </Button>
        <Button url="/dev" path={path} icon={HiOutlineDatabase}>
          Updates
        </Button>
        <Button url="/nope" path={path} icon={HiOutlineCurrencyDollar} isExternal>
          Donate
        </Button>
        <Divider />
        <Button url="/dark" path={path} icon={FiMoon}>
          Dark Mode
        </Button>
      </VStack>
    </div>
  );
};

export default Sidebar;
