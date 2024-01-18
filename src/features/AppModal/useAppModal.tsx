
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { APP_MODAL_STATE, toggleModal as toggleAppModal } from "./appModalSlce";
import { RootState } from "../../app/store";

export const useAppModal = () => {
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state: RootState) => state[APP_MODAL_STATE].open);
  const toggleModal = () => dispatch(toggleAppModal());
  return {
    toggleModal,
    isOpen,
  };
};
