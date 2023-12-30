import { useColorMode, VStack } from "@chakra-ui/react";
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
  HiOutlineMail,
} from "react-icons/hi";
import { FiMoon, FiSun } from "react-icons/fi";
import { changeLog } from "../../config/updates";

const Sidebar = () => {
  const path = useRouter().pathname;
  const { colorMode, toggleColorMode } = useColorMode();
  const extendedToggleTheme = () => {
    // Toggle Chakra UI color mode
    toggleColorMode();

    // Additional logic for Tailwind or other styling
    const nextMode = colorMode === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextMode);
    localStorage.setItem("theme", nextMode);
  };

  return (
    <div className="rounded-lg bg-bg py-8 lg:py-4 px-5 w-full sticky top-16 font-fredoka">
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
        <Button url="/about" path={path} icon={HiOutlineUserGroup}>
          About
        </Button>
        <Button url="/dev" path={path} icon={HiOutlineDatabase}>
          Updates (v{changeLog[0].version})
        </Button>
        {/* <Button url="/nope" path={path} icon={HiOutlineCurrencyDollar} isExternal>
          Donate
        </Button> */}
        <Button url="/contact" path={path} icon={HiOutlineMail}>
          Contact
        </Button>
        <Divider />
        <Button
          url=""
          path=""
          icon={colorMode === "light" ? FiMoon : FiSun}
          onClick={extendedToggleTheme}
        >
          {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
        {/* <Button url="/dark" path={path} icon={FiMoon}>
          Dark Mode
        </Button> */}
      </VStack>
    </div>
  );
};

export default Sidebar;
