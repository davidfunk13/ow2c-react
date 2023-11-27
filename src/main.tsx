import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

const rootElement = document.getElementById("root");

ReactDOM
  .createRoot(rootElement!)
  .render(
    <React.StrictMode>
      <CssBaseline enableColorScheme />
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
