import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router";
import { app } from "./lib/firebase.js";

import "./index.css";
import App from "./App.jsx";
import { theme } from "./theme/theme.js";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";

console.log(app.options.projectId);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
