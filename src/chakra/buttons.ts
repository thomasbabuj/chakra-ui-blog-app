import { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    borderColor: "brand.100",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },

  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "brand.100",
      _hover: {
        bg: "brand.100",
      },
    },
    outline: {
      border: "2px solid",
      borderColor: "brand.100",
      color: "brand.100",
    },
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "green.300",
      _hover: {
        bg: "green.50",
      },
    },
  },
};
