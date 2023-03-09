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
    py: "2",
    px: "5",
    borderRadius: "md",
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
