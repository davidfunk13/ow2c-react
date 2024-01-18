import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { toggleDrawer as toggleAppDrawer } from "./appDrawerSlice";

export const useAppDrawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state["state/appDrawer"].open);
  const toggleDrawer = () => dispatch(toggleAppDrawer());

  return {
    toggleDrawer,
    isOpen,
  };
};
