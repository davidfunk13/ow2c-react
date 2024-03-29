import { useState, useEffect } from "react";

type UseRandomSplashImageArray = string[]

const useRandomSplashImage = (images: UseRandomSplashImageArray): string => {
    const [selectedImage, setSelectedImage] = useState<string>("");

    useEffect(() => {
        if (images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            setSelectedImage(images[randomIndex]);
        }
    }, [images]);

    return selectedImage;
};

export default useRandomSplashImage;
