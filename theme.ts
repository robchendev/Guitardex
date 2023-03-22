import { Drawer, extendTheme } from "@chakra-ui/react";
import { ComponentStyleConfig } from "@chakra-ui/theme";
import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const Button: ComponentStyleConfig = {
  variants: {
    black: {
      bg: "black",
      color: "white",
    },
  },
};

const { defineMultiStyleConfig: accordionConfig } = createMultiStyleConfigHelpers(
  accordionAnatomy.keys
);

const accordionTheme = accordionConfig({
  baseStyle: {
    container: {
      bgColor: "#232323",
      borderRadius: "md",
      border: "none",
    },
    button: {
      px: "4",
      py: "3",
    },
  },
});

// use this file to define/inject custom theme
const theme = {
  colors: {
    // gold: "#FCDC97",
  },
  components: {
    Button,
    Accordion: accordionTheme,
  },
};

export default extendTheme(theme);
