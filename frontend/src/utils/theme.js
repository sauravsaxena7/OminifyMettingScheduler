import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    100: "#E5FCF1",//cyan
    200: "#38d39f",//green
    300: "#38d39f",//dark green
    400: "#38d39f",//more dark green
    500: "#38d39f",//aur jyada dark green
    600: "#0A864F",
    700: "#086F42",
    800: "#075C37",
    900: "#064C2E",
    1000:"#FF8C00",
  }
};

const customTheme = extendTheme({ colors });

export default customTheme;