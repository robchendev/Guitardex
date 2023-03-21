import { extendTheme } from "@chakra-ui/react";
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

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  accordionAnatomy.keys
);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    bgColor: "#232323",
    borderRadius: "md",
    border: "none",
  },
  button: {
    px: "4",
    py: "3",
  },
});
const accordionTheme = defineMultiStyleConfig({ baseStyle });

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
