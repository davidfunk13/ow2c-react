import { css } from "@emotion/react";

const useSelectMapStyles = () => ({
    cardIsSelected: css`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); 
    transform: scale(1.05);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  `,
});

export default useSelectMapStyles;
