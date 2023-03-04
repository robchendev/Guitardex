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
    gold: "#FCDC97",
  },
  components: {
    Button,
  },
};

export default extendTheme(theme);
