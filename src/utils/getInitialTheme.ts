const getInitialTheme = () => {
    try {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === null) {
            // If no theme is stored, initialize it in localStorage and return false
            // check for system theme preference
            const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDarkMode) {
                localStorage.setItem("theme", JSON.stringify(true));
                return true;
            }

            localStorage.setItem("theme", JSON.stringify(false));
            return false;
        }
        // Parse the stored theme only if it's not null
        return JSON.parse(storedTheme);
    } catch (error) {
        // if it fucks up, just set it to false and return false to default to light theme.
        localStorage.setItem("theme", JSON.stringify(false));
        return false;
    }
};

export default getInitialTheme;
