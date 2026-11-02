import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1976D2",
      dark: "#1565C0",
    },

    background: {
      default: "#F5F7FB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1F2937",
      secondary: "#64748B",
    },

    divider: "#DDE3EA",
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
