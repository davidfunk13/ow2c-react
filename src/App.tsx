import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./utils/router";

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
