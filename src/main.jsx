import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router";

import "./index.css";
import App from "./App.jsx";
import { theme } from "./theme/theme.js";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
import { app, db } from "./lib/firebase.js";

console.log("Firebase project:", app.options.projectId);
console.log("Firestore app:", db.app.options.projectId);



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
