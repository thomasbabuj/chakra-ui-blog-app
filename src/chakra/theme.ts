import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

import { Button } from "./buttons";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#2ba283",
    },
  },
  fonts: {
    body: `'Open Sans', sans-serif`,
  },

  styles: {
    global: () => ({
      body: {
        bg: "black",
        color: "white",
      },
    }),
  },

  components: {
    Button,
  },
});
