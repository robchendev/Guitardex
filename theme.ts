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
  colors: {
    brand: {
      100: "green",
      // ...
    },
  },
  components: {
    Button,
  },
};

export default extendTheme(theme);
