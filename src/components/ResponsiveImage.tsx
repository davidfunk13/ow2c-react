import { FC } from "react";

interface ResponsiveImageProps {
    src: string;
    alt: string;
}

const ResponsiveImage: FC<ResponsiveImageProps> = ({ src, alt, }) => {
    return (
        <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "auto" }}
        />
    );
};

export default ResponsiveImage;
