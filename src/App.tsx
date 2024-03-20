import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./utils/router";
import { ThemeProvider } from "@emotion/react";
import useThemeToggle from "./features/ThemeToggle/useThemeToggle";

const fallbackElement = <p>Initial Load...</p>;

const App: FC = () => {
  const { selectedThemeObject } = useThemeToggle();

  return (
    <ThemeProvider theme={selectedThemeObject}>
      <RouterProvider
        router={router}
        fallbackElement={fallbackElement}
      />
    </ThemeProvider>
  );
};

export default App;
