/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

// *NOTE*:
// run this script in the console with 'node generateSplashImports.cjs'
// to generate the imports file for the splash images;

const fs = require("fs");
const path = require("path");

try {
    const imagesDir = path.join(__dirname, "src/assets/splash");
    const output = path.join(__dirname, "src/utils/splashImages.ts");

    let imports = "";
    let imageArray = [];

    // Reading the directory
    const files = fs.readdirSync(imagesDir);
    files.forEach((file, index) => {
        const varName = `image${index}`;

        const filePath = path.join("../assets/splash/", file).replace(/\\/g, "/");
        console.log(`import ${varName} from "${filePath}";`);
        imports += `import ${varName} from "${filePath}";\n`;
        imageArray.push(varName);
    });

    const result = `export const splashImages: string[] = [${imageArray.join(", ")}];\n`;

    // Writing to the file
    fs.writeFileSync(output, imports + result);

    console.log("Splash images import file generated successfully.");
} catch (error) {
    console.error("Error generating splash images import file:", error);
}
