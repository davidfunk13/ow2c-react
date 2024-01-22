import { SerializedStyles, css } from "@emotion/react";

const rootContainerStyle = css`height: 100vh;`;

const logoStyle = css`
    height: auto;
    width: 100%;
    max-width: 300px;
`;

const gridStyle: (selectedImage: string, bgColor: string) => SerializedStyles = (selectedImage: string, bgColor: string) => css`
    background-image: url(${selectedImage});
    background-repeat: no-repeat;
    background-color: ${bgColor};
    background-size: cover;
    background-position: center;
`;

const paperGridStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export { rootContainerStyle, logoStyle, gridStyle, paperGridStyle };
