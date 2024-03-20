import { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useAppModal } from "./useAppModal";
import useAppModalStyles from "./useAppModalStyles";

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
  const { container } = useAppModalStyles();

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
        <Box css={container}>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default AppModal;
