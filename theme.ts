import { extendTheme } from "@chakra-ui/react";
import { ComponentStyleConfig } from "@chakra-ui/theme";

const Button: ComponentStyleConfig = {
  variants: {
    black: {
      bg: "black",
      color: "white",
    },
  },
};

// use this file to define/inject custom theme
const theme = {
  initialColorMode: "light",
  useSystemColorMode: false,
  components: {
    Button,
    // Accordion: accordionTheme,
  },
  breakpoints: {
    md: "768px",
    lg: "1024px",
  },
};

export default extendTheme(theme);
