/// <reference types="@emotion/react/types/css-prop" />
import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme { }
}

declare module "react" {
    interface Attributes {
        css?: import("@emotion/react").CSSProp | string;
    }
}
