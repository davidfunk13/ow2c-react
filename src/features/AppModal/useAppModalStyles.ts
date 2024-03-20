import { css } from "@emotion/react";

const useAppModalStyles = () => ({
    container: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vh;
    background-color: #ffffff; /* Assuming background.paper is white */
    border: 2px solid #000000;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.5);
    padding: 16px;
  `,
});

export default useAppModalStyles;
