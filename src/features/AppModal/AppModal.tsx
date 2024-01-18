import { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useAppModal } from "./useAppModal";

//migrate to style hook
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type AppModalProps = {
  children: React.ReactNode;
}

const slotProps = {
  backdrop: {
    timeout: 500,
  },
};

const AppModal: FC<AppModalProps> = ({ children }) => {
  const { isOpen, toggleModal } = useAppModal();
  return (
    <Modal
      aria-labelledby={"transition-modal-title"}
      aria-describedby={"transition-modal-description"}
      open={isOpen}
      onClose={toggleModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={slotProps}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default AppModal;
