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
import { IconType } from "react-icons";

type NavLink = { text: string; url: string; icon: IconType; isExternal: boolean };

const navLinksPrimary: NavLink[] = [
  {
    text: "My Guitardex",
    url: "/",
    icon: HiOutlineHome,
    isExternal: false,
  },
  {
    text: "Techniques",
    url: "/t",
    icon: HiOutlineViewGrid,
    isExternal: false,
  },
  {
    text: "Audio Production",
    url: "/a",
    icon: HiOutlineAdjustments,
    isExternal: false,
  },
  {
    text: "Help",
    url: "/help",
    icon: HiOutlineQuestionMarkCircle,
    isExternal: false,
  },
];

const navLinksSecondary: NavLink[] = [
  {
    text: "About",
    url: "/about",
    icon: HiOutlineUserGroup,
    isExternal: false,
  },
  {
    text: `Updates v${changeLog[0].version}`,
    url: "/dev",
    icon: HiOutlineDatabase,
    isExternal: false,
  },
  // {
  //   text: "Donate",
  //   url: "/nope",
  //   icon: HiOutlineCurrencyDollar,
  //   isExternal: true,
  // },
  {
    text: "Contact",
    url: "/contact",
    icon: HiOutlineMail,
    isExternal: false,
  },
];

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
        {navLinksPrimary.map(({ text, url, icon, isExternal }: NavLink, index: number) => (
          <Button url={url} path={path} icon={icon} isExternal={isExternal} key={index}>
            {text}
          </Button>
        ))}
        <Divider />
        {navLinksSecondary.map(({ text, url, icon, isExternal }: NavLink, index: number) => (
          <Button url={url} path={path} icon={icon} isExternal={isExternal} key={index}>
            {text}
          </Button>
        ))}
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
