import { RouterProvider } from "react-router-dom";
import router from "./utils/router";
import { FC } from "react";

const fallbackElement = <p>Initial Load...</p>;

const App: FC = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={fallbackElement}
    />
  );
};

export default App;
